import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionAnswerModel, QuestionAnswerOutput} from '../../../models/question.model';
import {QuestionStorageService} from '../../../services/question-storage.service';
import notify from 'devextreme/ui/notify';
import {UserService} from '../../../services/user.service';
import {Answer} from '../../../share/enums';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  partNumber: number;
  count: number;
  paramsSub: any;
  currentQuestion: QuestionAnswerModel;
  correctAnswer: string;
  isSelected: boolean;
  questionStorage: QuestionAnswerModel[];
  isLoading: boolean;
  isEnd: boolean;
  userId: number;
  answerABCD = Answer;

  constructor(private route: ActivatedRoute, private router: Router,
              private questionStorageService: QuestionStorageService,
              private userService: UserService) {
    this.userId = 2;
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
    this.isLoading = false;
    this.isEnd = false;
  }

  ngOnInit() {
    if (this.partNumber) {
      this.count = 1;
      this.getQuestions();
    }
    this.isSelected = false;
  }

  setCurrentQuestion(questionAnswer: QuestionAnswerModel) {
    if (questionAnswer) {
      this.currentQuestion = questionAnswer;
      debugger;
      if (this.currentQuestion.userAnswer) {
        this.displayAnswer();
      }
    }
  }

  getQuestions() {
    this.isLoading = true;
    this.questionStorageService.getQuestion(this.partNumber).subscribe(qtions => {
        if (qtions) {
          qtions.forEach(qtion => {
            const questionAnswer = new QuestionAnswerModel();
            questionAnswer.question = qtion;
            questionAnswer.id = this.count - 1;
            this.questionStorage.push(questionAnswer);
            this.count += 1;
          });
          if (this.currentQuestion) {
            if (this.currentQuestion.id !== this.count - 1) {
              this.setCurrentQuestion(this.questionStorage[this.currentQuestion.id + 1]);
            }
          } else {
            this.setCurrentQuestion(this.questionStorage[0]);
          }
        } else {
          notify('Error loading data!', 'error');
          this.isEnd = true;
        }
      }, (e) => {
        notify(e);
      }, () => this.isLoading = false
    );
  }

  updateAnswer(qa: QuestionAnswerModel) {
    this.currentQuestion.isCorrect = qa.isCorrect;
    this.currentQuestion.userAnswer = qa.userAnswer;
    debugger;
    this.displayAnswer();
    if (this.currentQuestion.userAnswer) {
      const input = new QuestionAnswerOutput({
        userId : this.userId,
        answer : qa.userAnswer,
        qtionId : qa.question.id,
        isCorrect: qa.isCorrect
      });
      this.userService.answerQuestion(input).subscribe((rr) => {
          if (!rr.success) {
            notify(rr.message, 'warning');
            this.clickNext();
          }
        }, () => notify('Error Server', 'error')
      );
    }
  }

  displayAnswer() {
    if (this.currentQuestion.userAnswer) {
      switch (this.currentQuestion.question.correctAnswer) {
        case this.answerABCD.A: {
          this.correctAnswer = 'A. ' + this.currentQuestion.question.answer1;
          break;
        }
        case this.answerABCD.B: {
          this.correctAnswer = 'B. ' + this.currentQuestion.question.answer2;
          break;
        }
        case this.answerABCD.C: {
          this.correctAnswer = 'C. ' + this.currentQuestion.question.answer3;
          break;
        }
        case this.answerABCD.D: {
          this.correctAnswer = 'D. ' + this.currentQuestion.question.answer4;
          break;
        }
        default:
          this.correctAnswer = 'No answer';
      }
    }
    if (this.currentQuestion.isCorrect) {
      document.getElementsByClassName('notification').item(0).classList.add('correct-answer');
    } else {
      document.getElementsByClassName('notification').item(0).classList.add('incorrect-answer');
    }
  }

  clickPrevious() {
    this.isEnd = false;
    document.getElementsByClassName('notification').item(0).classList.remove('incorrect-answer');
    document.getElementsByClassName('notification').item(0).classList.remove('correct-answer');
    this.setCurrentQuestion(this.questionStorage[this.currentQuestion.id - 1]);
  }

  clickNext() {
    document.getElementsByClassName('notification').item(0).classList.remove('incorrect-answer');
    document.getElementsByClassName('notification').item(0).classList.remove('correct-answer');

    if (this.questionStorage[this.currentQuestion.id + 1]) {
      this.setCurrentQuestion(this.questionStorage[this.currentQuestion.id + 1]);
    }
    if (!this.questionStorage[this.currentQuestion.id + 2]) {
      this.getQuestions();
    }
  }

  clickEnd() {
    this.router.navigate(['/test']);
  }
}
