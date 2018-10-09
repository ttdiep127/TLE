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
  userAnswer: any;
  answerABCD = Answer;
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
      this.userAnswer = this.currentAnswers[this.qa.userAnswer - 1];
      if (this.question.userAnswer) {
        this.correctAnswer = this.displayAnswer(this.qa);
      }

    }
  }

  onValueChanged(e) {
    if (!this.qa.userAnswer) {
      if (e.value) {
        this.qa.userAnswer = e.value.value;
        this.qa.isCorrect = this.qa.userAnswer === this.qa.question.correctAnswer;
        this.correctAnswer = this.displayAnswer(this.qa);
        this.questionChange.emit(this.qa);
      }
    }
  }

  displayAnswer(qa: QuestionAnswerModel): string {
    let answer = '';
    if (qa.userAnswer) {
      switch (qa.question.correctAnswer) {
        case this.answerABCD.A: {
          answer = 'A. ' + qa.question.answer1;
          break;
        }
        case this.answerABCD.B: {
          answer = 'B. ' + qa.question.answer2;
          break;
        }
        case this.answerABCD.C: {
          answer = 'C. ' + qa.question.answer3;
          break;
        }
        case this.answerABCD.D: {
          answer = 'D. ' + qa.question.answer4;
          break;
        }
        default:
          answer = 'No answer';
      }

      const notification = document.getElementsByClassName('notification');
      if (notification) {
        const position = notification.length === 1 ? 0 : qa.id - 1;
        notification.item(position).classList.remove('correct-answer');
        notification.item(position).classList.remove('incorrect-answer');
        if (qa.isCorrect) {
          document.getElementsByClassName('notification').item(position).classList.add('correct-answer');
        } else {
          document.getElementsByClassName('notification').item(position).classList.add('incorrect-answer');
        }
      }
    }
    return answer;
  }
}
