import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService, CookieOptionsArgs} from 'angular2-cookie/services';
import {NgxPermissionsService} from 'ngx-permissions';
import {BehaviorSubject} from 'rxjs';
import {Observable, of} from 'rxjs';
import {UserInfo, UserLogin} from '../models/account.model';
import {BaseService} from './base.service';

import {RequestResponse} from '../models/RequestResponse';
import {MemberbarComponent} from '../share/components/header/memberbar/memberbar.component';

export const ACCOUNT_STORE_NAME = 'hongkong1';

@Injectable()
export class AuthenticationService {
  private baseUrl = 'api/authentication';
  private _loginUser: BehaviorSubject<UserInfo> = new BehaviorSubject(null);
  private loggedIn: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  constructor(private router: Router, private permissionsService: NgxPermissionsService
    , private cookieService: CookieService, private baseService: BaseService
    , private route: ActivatedRoute) {
  }

  get currentUser(): Observable<UserInfo> {
    return this._loginUser.asObservable();
  }

  get loggedUserId(): number {
    if (this._loginUser.getValue()) {
      return this._loginUser.getValue().id;
    }
    return null;
  }

  get currentUserId(): number {
    const user = this._loginUser.getValue();
    return user ? user.id : null;
  }

  setCurrentUser(value: UserInfo) {
    this._loginUser.next(value);
  }

  get loggedUser(): UserInfo {
    if (!this.cookieService.get(ACCOUNT_STORE_NAME)) {
      return null;
    }

    return JSON.parse(atob(this.cookieService.get(ACCOUNT_STORE_NAME)));
  }

  setLoggedUser(user: UserInfo) {
    if (user) {
      this.subscribeLogin(user);
      // Remove old access token if have
      this.cookieService.remove('AccessToken');
      this.cookieService.remove(ACCOUNT_STORE_NAME);
      // if remember login
      if (user.exp != null) {
        const expiresDate = new Date(user.exp);
        const opts: CookieOptionsArgs = {expires: expiresDate};
        // Add new value for token
        this.cookieService.put('AccessToken', user.accessToken, opts);
        this.cookieService.put(ACCOUNT_STORE_NAME, btoa(JSON.stringify(user)), opts);
      } else {
        this.cookieService.put('AccessToken', user.accessToken);
        this.cookieService.put(ACCOUNT_STORE_NAME, btoa(JSON.stringify(user)));
      }
    } else {
      this.cookieService.remove('AccessToken');
      this.cookieService.remove(ACCOUNT_STORE_NAME);
      this.subscribeLogout();
    }

    this.initAccountInfo();
  }

  get accessToken(): string {
    return this.loggedUser.accessToken;
  }

  setAccessToken(token: string, opts?: CookieOptionsArgs) {
    if (!!this.cookieService.get('AccessToken')) {
      this.cookieService.remove('AccessToken');
    }
    this.cookieService.put('AccessToken', token, opts);
  }

  isLoggedIn(): boolean {
    return this.cookieService.get(ACCOUNT_STORE_NAME) != null;
  }

  login(loginData: UserLogin): Observable<RequestResponse> {
    return this.baseService.post(`${this.baseUrl}/login`, loginData);
    // return of(new RequestResponse());
  }

  initAccountInfo() {
    const user = this.loggedUser;
    this.setCurrentUser(user);

    // if (!user) {
    //   this.permissionsService.flushPermissions();
    // } else {
    //   this.permissionsService.loadPermissions(user.roles);
    // }
  }

  logout() {
    this.baseService.get(`${this.baseUrl}/logout/`).subscribe(() => {
    }, () => {
    }, () => {
      this.setLoggedUser(null);
    });
  }

  register(registerInfo: { email: string; password: string; lastName: string; firstName: string }) {
    return this.baseService.post(`${this.baseUrl}/register`, registerInfo);
  }


  subscribeLogin(user: UserInfo) {
    this.loggedIn.next(user);
  }

  subscribeLogout() {
    this.loggedIn.next(null);
  }

  handleSubscribeLogin(): Observable<any> {
    return this.loggedIn.asObservable();
  }
}
