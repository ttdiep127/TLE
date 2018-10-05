import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionAnswerModel} from '../../../models/question.model';
import {QuestionStorageService} from '../../../services/question-storage.service';
import {Answer} from '../../../share/enums';
import notify from 'devextreme/ui/notify';
import {promise} from 'selenium-webdriver';
import {UserService} from '../../../services/user.service';

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
  currentAnswers: any;
  isSelected: boolean;
  answer: string;
  answerABCD = Answer;
  questionStorage: QuestionAnswerModel[];
  isCorrectAnswer: boolean;
  isLoading: boolean;
  isEnd: boolean;
  userId: number;

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
      this.isSelected = false;
      this.currentQuestion = questionAnswer;
      this.currentAnswers = [
        {text: 'A. ' + (questionAnswer.question.answer1 || ''), value: 1},
        {text: 'B. ' + (questionAnswer.question.answer2 || ''), value: 2},
        {text: 'C. ' + (questionAnswer.question.answer3 || ''), value: 3}
      ];

      if (this.partNumber !== 2) {
        this.currentAnswers.push({text: 'D. ' + (questionAnswer.question.answer4 || ''), value: 4});
      }

      if (this.currentQuestion.answered) {
        this.isSelected = true;
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
            questionAnswer.answered = false;
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

  onValueChanged(e) {
    if (!this.currentQuestion.answered) {
      if (e.value) {
        this.currentQuestion.userAnswer = e.value.value;
        this.currentQuestion.answered = true;
        this.isSelected = true;
        this.isCorrectAnswer = this.currentQuestion.userAnswer === this.currentQuestion.question.correctAnswer;
        this.displayAnswer();


        this.userService.answerQuestion(this.userId, this.currentQuestion.question.id,
          this.currentQuestion.userAnswer, this.isCorrectAnswer).subscribe((rr) => {
            if (!rr.success) {
              notify(rr.message, 'warning');
              this.clickNext();
            }
          }, () => notify('Error Server', 'error')
        );
      }
    }

  }

  displayAnswer() {
    if (this.isSelected) {
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
    }

    if (this.isCorrectAnswer) {
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
