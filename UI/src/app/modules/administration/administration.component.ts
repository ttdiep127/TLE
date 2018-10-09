import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  addTestPopupVisible: boolean;

  constructor() {
  }

  ngOnInit() {
    this.addTestPopupVisible = true;
  }

}
