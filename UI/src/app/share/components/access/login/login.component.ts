import {Component, OnInit} from '@angular/core';
import {UserLogin} from '../../../../models/account.models';
import {AuthenticationService} from '../../../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Utility} from '../../../Utility';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: UserLogin;
  isLoading: boolean;
  returnUrl: string;
  loginBtnId: string;
  isValidAccount: boolean;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.isLoading = false;
    this.loginData = new UserLogin();
    this.loginData.isKeepSignedIn = true;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([this.returnUrl]);
    } else {
      // this.authService.logout();
    }
    this.loginBtnId = Utility.getGUID();
  }

  onSubmit(e) {
    this.isLoading = true;

    this.authService.login(this.loginData)
      .subscribe((rr) => {
          if (rr.success) {
            const user = rr.obj;
            this.authService.setLoggedUser(user);
            this.router.navigate(['/dashboard']);
            if (this.loginData.isKeepSignedIn) {
              localStorage.removeItem('Name');
              localStorage.removeItem('Remember me');
              localStorage.setItem('Name', 'ELDesk');
              localStorage.setItem('Remember me', user.accessToken);
            }
          } else {
            notify(rr.message);

            this.isValidAccount = false;
            this.isLoading = false;

          }
        }, er => {
          notify(er);
          this.isLoading = false;
        },
        () => this.isLoading = false
      );
  }
}
