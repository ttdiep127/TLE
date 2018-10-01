import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService, CookieOptionsArgs} from 'angular2-cookie/services';
import {NgxPermissionsService} from 'ngx-permissions';
import {BehaviorSubject} from 'rxjs';
import {Observable, of} from 'rxjs';
import {LoggedUser, RegisterUser, UserInfo, UserLogin} from '../models/account.models';
import {BaseService} from './api.service';

import {RequestResponse} from '../models/RequestResponse';

export const ACCOUNT_STORE_NAME = 'token';

@Injectable()
export class AuthenticationService {
  private baseUrl = 'api/authentication';
  private _loginUser: BehaviorSubject<LoggedUser> = new BehaviorSubject(null);
  private _currentEmployee: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  constructor(private router: Router, private permissionsService: NgxPermissionsService
    , private cookieService: CookieService, private baseService: BaseService
    , private route: ActivatedRoute) {
  }

  get currentEmployee(): Observable<UserInfo> {
    return this._currentEmployee.asObservable();
  }

  setCurrentEmployee(value: UserInfo) {
    this._currentEmployee.next(value);
  }

  get currentUser(): Observable<LoggedUser> {
    return this._loginUser.asObservable();
  }

  get loggedUserId(): number {
    if (this._loginUser.getValue()) {
      return this._loginUser.getValue().userId;
    }
    return null;
  }

  get currentUserId(): number {
    const user = this._loginUser.getValue();
    return user ? user.userId : null;
  }

  setCurrentUser(value: LoggedUser) {
    this._loginUser.next(value);
  }

  get loggedUser(): LoggedUser {
    if (!this.cookieService.get(ACCOUNT_STORE_NAME)) {
      return null;
    }

    return JSON.parse(atob(this.cookieService.get(ACCOUNT_STORE_NAME)));
  }

  setLoggedUser(user: LoggedUser) {
    if (user) {
      // Remove old access token if have
      this.cookieService.remove('AccessToken');
      this.cookieService.remove(ACCOUNT_STORE_NAME);
      // If remember login
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
      // Login userProfile
    } else {
      this.cookieService.remove('AccessToken');
      this.cookieService.remove(ACCOUNT_STORE_NAME);
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

  initAccountInfo() {
    const user = this.loggedUser;
    this.setCurrentUser(user);

    if (!user) {
      this.permissionsService.flushPermissions();
      this.setCurrentEmployee(null);
    } else {
      this.permissionsService.loadPermissions(user.roles);
    }
  }

  login(loginData: UserLogin): Observable<RequestResponse> {
    return this.baseService.post(`${this.baseUrl}/login`, loginData);
    // return of(new RequestResponse());
  }


  loginWithUserId(userId: number): Observable<LoggedUser> {
    return this.baseService.get(`${this.baseUrl}/login/` + userId);
  }

  logout() {
    this.baseService.get(`${this.baseUrl}/logout/`).subscribe(() => {
    }, () => {
    }, () => {
      this.setLoggedUser(null);
      this.router.navigate(['/login']);
    });
  }

  // reset password
  requestPasswordReset(email: string): Observable<boolean> {
    return this.baseService.post(`${this.baseUrl}/forgot`, {email: email});
  }

  checkResetPasswordCode(code: string): Observable<string> {
    return this.baseService.post(`${this.baseUrl}/check-password-token`, {passwordToken: code});
  }


  // register and reset password
  register(account: RegisterUser): Observable<number> {
    return this.baseService.post(`${this.baseUrl}/register`, account);
  }

  activeUser(activeCode: string): Observable<UserLogin> {
    return this.baseService.get(`${this.baseUrl}/active/${activeCode}`);
  }

  resendEmailToActivate(email: string): Observable<boolean> {
    return this.baseService.post(`${this.baseUrl}/resend`, {email: email});
  }
}
