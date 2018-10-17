import {Component, Input, OnInit} from '@angular/core';
import {QuestionAnswerModel} from '../../../models/question.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() answers: QuestionAnswerModel[];
  correctAnswerNumber: number;


  ngOnInit() {
    this.correctAnswerNumber = 0;
    this.answers.forEach(answer => {
      if (answer.isCorrect) {
        this.correctAnswerNumber  += 1;
      }
    });
  }

}
