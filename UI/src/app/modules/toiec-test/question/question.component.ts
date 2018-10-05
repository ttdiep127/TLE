import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {QuestionAnswerModel} from '../../../models/question.model';
import {cloneDeep} from 'lodash';
import {Answer} from '../../../share/enums';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input() question: QuestionAnswerModel;
  @Output() questionChange = new EventEmitter<QuestionAnswerModel>();

  qa: QuestionAnswerModel;
  currentAnswers: any;
  correctAnswer: string;
  answerABCD = Answer;
  userAnswer: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question) {
      if (changes.question.previousValue) {
        if (changes.question.currentValue.id !== changes.question.previousValue.id) {
          this.resetQuestion();
        }
      }
    }
  }

  ngOnInit() {
    this.resetQuestion();
  }

  resetQuestion() {
    if (this.question) {
      this.qa = cloneDeep(this.question);
      this.currentAnswers = [
        {text: 'A. ' + (this.qa.question.answer1 || ''), value: 1},
        {text: 'B. ' + (this.qa.question.answer2 || ''), value: 2},
        {text: 'C. ' + (this.qa.question.answer3 || ''), value: 3},
        {text: 'D. ' + (this.qa.question.answer4 || ''), value: 4}
      ];
      debugger;
      this.userAnswer = this.currentAnswers[this.qa.userAnswer-1];
    }
  }

  onValueChanged(e) {
    if (!this.qa.userAnswer) {
      if (e.value) {
        this.qa.userAnswer = e.value.value;
        this.qa.isCorrect = this.qa.userAnswer === this.qa.question.correctAnswer;
        this.questionChange.emit(this.qa);
      }
    }
  }




}
