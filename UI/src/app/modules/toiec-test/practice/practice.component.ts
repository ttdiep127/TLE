import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionAnswerModel, QuestionAnswerOutput} from '../../../models/question.model';
import {QuestionStorageService} from '../../../services/question-storage.service';
import notify from 'devextreme/ui/notify';
import {UserService} from '../../../services/user.service';
import {Answer} from '../../../share/enums';
import {cloneDeep} from 'lodash';
import {ParagraphModel} from '../../../models/paragraph.model';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  partNumber: number;
  count: number;
  paramsSub: any;
  currentQuestion: any;
  correctAnswer: string;
  isSelected: boolean;
  questionsStorage: QuestionAnswerModel[];
  isLoading: boolean;
  isEnd: boolean;
  userId: number;
  answerABCD = Answer;
  paragraphsStorage: ParagraphModel[];
  currentPara: ParagraphModel;

  constructor(private route: ActivatedRoute, private router: Router,
              private questionStorageService: QuestionStorageService,
              private userService: UserService) {
    this.userId = 2;
    this.paramsSub = this.route.params.subscribe(params => {
        const id = params['id'];
        if (!isNaN(id)) {
          this.partNumber = parseInt(id, 10);
        }
        if (!this.partNumber) {
          this.router.navigate(['/test']);
        }
      }
    );

    this.questionsStorage = [];
    this.paragraphsStorage = [];
    this.isLoading = false;
    this.isEnd = false;
  }

  ngOnInit() {
    this.count = 1;
    switch (this.partNumber) {
      case 5: {
        this.getQuestions();
        break;
      }
      case 6: {
        this.getParagraph();
        break;
      }
      case 7: {
        this.getParagraph();
        break;
      }
      default: {
        this.router.navigate(['/test']);
      }

    }
    this.isSelected = false;
  }

  setCurrentQuestion(questionAnswer: QuestionAnswerModel) {
    if (questionAnswer) {
      this.currentQuestion = questionAnswer;
      if (this.currentQuestion.userAnswer) {
        this.correctAnswer = this.displayAnswer(this.currentQuestion);
      }
    }
  }

  setCurrentParagraph(para: ParagraphModel) {
    if (para) {
      this.currentPara = para;
      this.correctAnswer = '';
      this.currentPara.questions.forEach((qtion) => {
        let index = 1;
        const qa = this.questionsStorage.find(_ => _.id === qtion.id);
        if (qa && qa.userAnswer) {
          this.correctAnswer = index + '. ' + this.displayAnswer(qa) + '\n';
        }
        index += 1;
      });
    }

  }

  getParagraph() {
    this.questionStorageService.getParagraph(this.partNumber).subscribe((para) => {
      this.paragraphsStorage[this.count] = para;
      para.questions.forEach(qtion => {
        const questionAnswer = new QuestionAnswerModel({
          id: qtion.id,
          question: qtion,
        });
        this.questionsStorage.push(questionAnswer);
      });
      this.setCurrentParagraph(this.paragraphsStorage[this.count]);
    });
  }

  getQuestions() {
    this.isLoading = true;
    this.questionStorageService.getQuestion(this.partNumber).subscribe(qtions => {
        if (qtions) {
          qtions.forEach(qtion => {
            const questionAnswer = new QuestionAnswerModel();
            questionAnswer.question = qtion;
            questionAnswer.id = this.count - 1;
            this.questionsStorage.push(questionAnswer);
            this.count += 1;
          });
          if (this.currentQuestion) {
            if (this.currentQuestion.id !== this.count - 1) {
              this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id + 1]);
            }
          } else {
            this.setCurrentQuestion(this.questionsStorage[0]);
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
    this.correctAnswer = this.displayAnswer(this.currentQuestion);
    if (this.currentQuestion.userAnswer) {
      const input = new QuestionAnswerOutput({
        userId: this.userId,
        answer: qa.userAnswer,
        qtionId: qa.question.id,
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
      if (this.currentQuestion.isCorrect) {
        document.getElementsByClassName('notification').item(0).classList.add('correct-answer');
      } else {
        document.getElementsByClassName('notification').item(0).classList.add('incorrect-answer');
      }
    }
    return answer;
  }

  clickPrevious() {
    this.isEnd = false;
    document.getElementsByClassName('notification').item(0).classList.remove('incorrect-answer');
    document.getElementsByClassName('notification').item(0).classList.remove('correct-answer');
    this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id - 1]);
  }

  clickNext() {
    document.getElementsByClassName('notification').item(0).classList.remove('incorrect-answer');
    document.getElementsByClassName('notification').item(0).classList.remove('correct-answer');

    if (this.questionsStorage[this.currentQuestion.id + 1]) {
      this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id + 1]);
    }
    if (!this.questionsStorage[this.currentQuestion.id + 2]) {
      this.getQuestions();
    }
  }

  clickEnd() {
    this.router.navigate(['/test']);
  }
}
