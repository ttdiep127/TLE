import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../../../models/account.model';
import {AuthenticationService} from '../../../../services/authentication.service';

@Component({
  selector: 'app-memberbar',
  templateUrl: './memberbar.component.html',
  styleUrls: ['./memberbar.component.scss']
})
export class MemberbarComponent implements OnInit {
  user: UserInfo;
  displayLoginForm = false;
  displayRegisterForm = false;

  constructor(private authService: AuthenticationService) {
    this.getCurrentUser();
  }

  ngOnInit() {
  }

  loggedIn(loggedUser: UserInfo) {
    this.displayLoginForm = false;
    this.displayRegisterForm = false
    this.user = loggedUser;
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }

  public getCurrentUser() {
    this.authService.currentUser.subscribe((u) => {
      this.user = u;
    });
  }

}
