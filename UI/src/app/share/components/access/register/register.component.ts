import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication.service';
import notify from 'devextreme/ui/notify';
import {UserLogin} from '../../../../models/account.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSuccess: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();

  email: string;
  password: string;
  lastName: string;
  firstName: string;
  isLoading: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  closeRegisterForm() {
    this.onCancel.emit();
  }

  passwordComparison = () => {
    return this.password;
  };

  onSubmit(e) {
    const registerInfo = {
      email: this.email,
      password: this.password,
      lastName: this.lastName,
      firstName: this.firstName,
    };

    this.authService.register(registerInfo).subscribe((rr) => {
      if (rr.success) {
        notify('Registed', 'success');
        const user = new UserLogin({
          emailAddress: registerInfo.email,
          password: registerInfo.password,
          isKeepSignedIn: true
        });
        this.loginUser(user);
      }
    });
  }

  private loginUser(loginData: UserLogin) {
    this.isLoading = true;

    this.authService.login(loginData)
      .subscribe((rr) => {
          if (rr.success) {
            const user = rr.data;
            this.authService.setLoggedUser(user);
            this.onSuccess.emit(user);

            localStorage.removeItem('Name');
            localStorage.removeItem('Remember me');
            localStorage.setItem('Name', 'ELDesk');
            localStorage.setItem('Remember me', user.accessToken);
          } else {
            notify(rr.message);
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
