import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {QuestionAnswerModel} from '../../../models/question.model';
import {cloneDeep} from 'lodash';
import {Answers} from '../../../share/enums';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  private _question: QuestionAnswerModel;

  @Input()
  get question(): QuestionAnswerModel {
    return this._question;
  }

  set question(value: QuestionAnswerModel) {
    this._question = value;
  }

  @Input() isTesting: boolean;
  @Output() onChange = new EventEmitter<QuestionAnswerModel>();

  qa: QuestionAnswerModel;
  currentAnswers: any;
  userAnswer: any;
  correctAnswer: string;

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

    if (changes.isTesting) {
      if (changes.isTesting.currentValue === false) {
        this.resetQuestion();
      }
    }
  }

  ngOnInit() {
    this.resetQuestion();
  }

  resetQuestion() {
    if (this._question) {
      this.correctAnswer = null;
      this.qa = cloneDeep(this._question);
      this.currentAnswers = [
        {text: 'A. ' + (this.qa.question.answer1 || ''), value: 1},
        {text: 'B. ' + (this.qa.question.answer2 || ''), value: 2},
        {text: 'C. ' + (this.qa.question.answer3 || ''), value: 3},
        {text: 'D. ' + (this.qa.question.answer4 || ''), value: 4}
      ];
      this.userAnswer = this.currentAnswers[this.qa.userAnswer - 1];
      if (this._question.userAnswer && !this.isTesting) {
        this.displayAnswer(this.qa);
      }
    }
  }

  onValueChanged(e) {
    if (e.value) {
      this.qa.userAnswer = e.value.value;
      this.qa.isCorrect = this.qa.userAnswer === this.qa.question.correctAnswer;
      this.onChange.emit(this.qa);
    }
  }

  displayAnswer(qa: QuestionAnswerModel) {
    let answer = '';
    if (qa.userAnswer) {
      switch (qa.question.correctAnswer) {
        case Answers.A: {
          answer = 'A. ' + qa.question.answer1;
          break;
        }
        case Answers.B: {
          answer = 'B. ' + qa.question.answer2;
          break;
        }
        case Answers.C: {
          answer = 'C. ' + qa.question.answer3;
          break;
        }
        case Answers.D: {
          answer = 'D. ' + qa.question.answer4;
          break;
        }
        default:
          answer = 'No answer';
      }

      const notification = document.getElementsByClassName('notification');
      const position = notification.length === 1 ? 0 : qa.id - 1;
      // if (notification.item(position)) {
      //   notification.item(position).classList.remove('correct-answer');
      //   notification.item(position).classList.remove('incorrect-answer');
      //   if (qa.isCorrect) {
      //     document.getElementsByClassName('notification').item(position).classList.add('correct-answer');
      //   } else {
      //     document.getElementsByClassName('notification').item(position).classList.add('incorrect-answer');
      //   }
      // }
    }
    this.correctAnswer = answer;
  }
}
