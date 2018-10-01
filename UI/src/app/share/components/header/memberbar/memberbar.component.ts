import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../../../models/account.models';

@Component({
  selector: 'app-memberbar',
  templateUrl: './memberbar.component.html',
  styleUrls: ['./memberbar.component.scss']
})
export class MemberbarComponent implements OnInit {
  user: UserInfo = null;
  onLogin = false;
  onRegister = false;

  constructor() {
  }

  ngOnInit() {
  }

}
