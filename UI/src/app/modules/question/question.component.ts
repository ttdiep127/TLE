import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {cloneDeep} from 'lodash';
import {Answers} from '../../share/enums';
import {QuestionViewModel} from '../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  private _question: QuestionViewModel;

  @Input()
  get question(): QuestionViewModel {
    return this._question;
  }

  set question(value: QuestionViewModel) {
    this._question = value;
  }

  @Input() isTesting: boolean;
  @Output() onChange = new EventEmitter<QuestionViewModel>();

  qa: QuestionViewModel;
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
        {text: 'A. ' + (this.qa.answer1 || ''), value: 1},
        {text: 'B. ' + (this.qa.answer2 || ''), value: 2},
        {text: 'C. ' + (this.qa.answer3 || ''), value: 3},
        {text: 'D. ' + (this.qa.answer4 || ''), value: 4}
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
      this.qa.isCorrect = this.qa.userAnswer === this.qa.correctAnswer;
      this.onChange.emit(this.qa);
    }
  }

  displayAnswer(qa: QuestionViewModel) {
    let answer = '';
    if (qa.userAnswer) {
      switch (qa.correctAnswer) {
        case Answers.A: {
          answer = 'A. ' + qa.answer1;
          break;
        }
        case Answers.B: {
          answer = 'B. ' + qa.answer2;
          break;
        }
        case Answers.C: {
          answer = 'C. ' + qa.answer3;
          break;
        }
        case Answers.D: {
          answer = 'D. ' + qa.answer4;
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
