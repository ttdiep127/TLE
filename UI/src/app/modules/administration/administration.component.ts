import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  addTestPopupVisible: boolean;
  onTest = 1;
  onQtion = 2;
  onPara = 3;
  onOpen: number;
  isLoading: boolean;


  constructor() {
    this.isLoading = false;
  }

  ngOnInit() {
    this.addTestPopupVisible = true;
  }

}
