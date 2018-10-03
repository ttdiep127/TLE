import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {QuestionAnswerModel, QuestionModel} from '../../../models/question.model';
import {QuestionStorageService} from '../../../services/question-storage.service';
import {Answer} from '../../../share/enums';
import {DxRadioGroupModule} from 'devextreme-angular';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  partNumber: number;
  noQtion: number;
  paramsSub: any;
  currentQuestion: QuestionAnswerModel;
  nextQuestion: QuestionAnswerModel;
  currentAnswers: any;
  isSelected: boolean;
  answer: string;
  answerABCD = Answer;
  isCorrectAnswer: boolean;
  questionStorage: QuestionAnswerModel[];


  constructor(private route: ActivatedRoute, private router: Router, private questionStorageService: QuestionStorageService) {
    this.paramsSub = this.route.params.subscribe(params => {
        const id = params['id'];
        if (!isNaN(id)) {
          const number = parseInt(id, 10);
          if (number >= 5 && number <= 7) {
            this.partNumber = number;
          }
        }
        if (!this.partNumber) {
          this.router.navigate(['/test']);
        }
      }
    );

    this.isSelected = false;
    this.questionStorage = [];
  }

  ngOnInit() {
    if (this.partNumber) {
      this.noQtion = 1;
      this.questionStorageService.getQuestion(this.partNumber).subscribe(qtion => {
          const questionAnswer = new QuestionAnswerModel();
          questionAnswer.question = qtion;
          questionAnswer.answered = false;
          questionAnswer.id = this.noQtion;
          this.questionStorage.push(questionAnswer);
          this.setCurrentQuestion(questionAnswer);
        }
      );
      this.getNextQuestion();
    }
  }

  setCurrentQuestion(questionAnswer: QuestionAnswerModel) {
    this.currentQuestion = questionAnswer;
    this.currentAnswers = [
      {text: 'A. ' + (questionAnswer.question.answer1 || ''), value: 1},
      {text: 'B. ' + (questionAnswer.question.answer2 || ''), value: 2},
      {text: 'C. ' + (questionAnswer.question.answer3 || ''), value: 3}
    ];

    if (this.partNumber !== 2) {
      this.currentAnswers.push({text: 'D. ' + (questionAnswer.question.answer4 || ''), value: 4});
    }
  }

  getNextQuestion() {
    this.questionStorageService.getQuestion(this.partNumber).subscribe(qtion => {
        const questionAnswer = new QuestionAnswerModel();
        questionAnswer.question = qtion;
        questionAnswer.answered = false;
        questionAnswer.id = this.noQtion + 1;
        this.questionStorage.push(questionAnswer);
      }
    );
  }

  onValueChanged(e) {
    this.isSelected = true;
    switch (this.currentQuestion.question.correctAnswer) {
      case this.answerABCD.A: {
        this.answer = 'A. ' + this.currentQuestion.question.answer1;
        break;
      }
      case this.answerABCD.B: {
        this.answer = 'B. ' + this.currentQuestion.question.answer2;
        break;
      }
      case this.answerABCD.C: {
        this.answer = 'C. ' + this.currentQuestion.question.answer3;
        break;
      }
      case this.answerABCD.D: {
        this.answer = 'D. ' + this.currentQuestion.question.answer4;
        break;
      }
      default:
        this.answer = 'No answer';
    }
    this.isCorrectAnswer = e.value.value === this.currentQuestion.question.correctAnswer;
    if (this.isCorrectAnswer) {
      document.getElementsByClassName('notification').item(0).classList.add('correct-answer');
    } else {
      document.getElementsByClassName('notification').item(0).classList.add('incorrect-answer');
    }

  }

}
