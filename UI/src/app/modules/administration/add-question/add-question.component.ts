import { Component, OnInit } from '@angular/core';
import {TOIECPARTS} from '../../../share/constant.data';
import {QuestionModel} from '../../../models/question.model';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  question: QuestionModel;
  answers: string[];
  toiecParts = TOIECPARTS;
  currentPart: number;
  correctAnswer: string;
  constructor() { }

  ngOnInit() {
    this.answers = [];
    this.question = new QuestionModel();
  }

}
