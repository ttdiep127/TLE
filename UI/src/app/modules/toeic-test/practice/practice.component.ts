import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionAnswerModel, QuestionAnswerOutput, QuestionModel} from '../../../models/question.model';
import {UserService} from '../../../services/user.service';
import {cloneDeep} from 'lodash';
import {ParagraphModel} from '../../../models/paragraph.model';
import notify from 'devextreme/ui/notify';
import {QuestionService} from '../../../services/question.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {GuideToeicPartV} from '../../../data/guideToiecPart';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  topicNumber: number;
  partNumber: number;
  count: number;
  paramsSub: any;
  currentQuestion: QuestionAnswerModel;
  isSelected: boolean;
  questionsStorage: QuestionAnswerModel[];
  isLoading: boolean;
  isEnd: boolean;
  paragraphsStorage: ParagraphModel[];
  currentPara: ParagraphModel;
  isFirstQuestion: boolean;
  guideToeicPart = GuideToeicPartV;
  inIntroduce: boolean;
  correctAnswer: string;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router,
              private questionService: QuestionService,
              private userService: UserService) {
    this.paramsSub = this.route.params.subscribe(params => {
        const id = params['id'];
        if (!isNaN(id)) {
          this.topicNumber = parseInt(id, 10);
        }
        if (!this.topicNumber) {
          switch (id) {
            case 'part5':
              this.partNumber = 5;
              break;
            default:
              this.router.navigate(['/test']);
              break;
          }

        }
      }
    );
    this.inIntroduce = true;
    this.questionsStorage = [];
    this.paragraphsStorage = [];
    this.isLoading = false;
    this.isEnd = false;
    this.isFirstQuestion = false;
  }

  ngOnInit() {
    this.count = 1;

    this.getQuestions();

    // switch (this.partNumber) {
    //   case 5: {
    //     this.getQuestions();
    //     break;
    //   }
    //   case 6: {
    //     this.getParagraph();
    //     break;
    //   }
    //   case 7: {
    //     this.getParagraph();
    //     break;
    //   }
    //   default: {
    //     this.router.navigate(['/test']);
    //   }
    // }
    this.isSelected = false;
  }

  setCurrentQuestion(questionAnswer: QuestionAnswerModel) {
    if (questionAnswer) {
      this.currentQuestion = questionAnswer;
      // if (this.currentQuestion.userAnswer) {
      //   this.correctAnswer = this.displayAnswer(this.currentQuestion);
      // }

      if (this.currentQuestion === this.questionsStorage[0]) {
        this.isFirstQuestion = true;
      } else {
        this.isFirstQuestion = false;
      }
    }
  }

  // setCurrentParagraph(para: ParagraphModel) {
  //   if (para) {
  //     this.currentPara = para;
  //     this.questionsStorage = this.resetQuestionStorage(para.questions);
  //     if (this.currentPara === this.paragraphsStorage[0]) {
  //       this.isFirstQuestion = true;
  //     } else {
  //       this.isFirstQuestion = false;
  //     }
  //   }
  // }

  // getParagraph() {
  //   this.questionService.getParagraph(this.partNumber).subscribe((para) => {
  //     if (para) {
  //       para.id = this.count;
  //       this.paragraphsStorage.push(para);
  //       this.questionsStorage = this.resetQuestionStorage(para.questions);
  //     }
  //     this.setCurrentParagraph(this.paragraphsStorage[this.count - 1]);
  //     this.count += 1;
  //   }, e => notify(e), () => this.isLoading = false);
  // }

  resetQuestionStorage(questions: QuestionModel[]): QuestionAnswerModel[] {
    const storage: QuestionAnswerModel[] = [];
    questions.forEach(qtion => {
      const questionAnswer = new QuestionAnswerModel({
        id: qtion.position,
        question: qtion
      });
      storage.push(questionAnswer);
    });

    return storage;
  }

  addQuestions(qtions: QuestionModel[]) {
    qtions.forEach(qtion => {
      const questionAnswer = new QuestionAnswerModel();
      questionAnswer.question = qtion;
      questionAnswer.id = this.count;
      this.questionsStorage.push(questionAnswer);
      this.count += 1;
    });
    debugger;
    if (!this.currentQuestion) {
      this.setCurrentQuestion(this.questionsStorage[0]);
    }
  }

  getQuestions() {
    if (this.topicNumber) {
      this.isLoading = true;
      debugger;
      this.questionService.getQuestionsTopic(this.topicNumber).subscribe((qs) => {
        this.addQuestions(qs);
      }, (er) => notify(er), () => this.isLoading = false);
    } else {
      if (this.partNumber === 5) {
        this.isLoading = true;
        this.questionService.getQuestions(this.partNumber).subscribe((qs) => {
          this.addQuestions(qs);
        }, (er) => notify(er), () => this.isLoading = false);
      }
    }
  }

  // getQuestions() {
  //   this.isLoading = true;
  //   this.questionService.getQuestions(this.partNumber).subscribe(qtions => {
  //       if (qtions) {
  //         qtions.forEach(qtion => {
  //           const questionAnswer = new QuestionAnswerModel();
  //           questionAnswer.question = qtion;
  //           questionAnswer.id = this.count;
  //           this.questionsStorage.push(questionAnswer);
  //           this.count += 1;
  //         });
  //         if (!this.currentQuestion) {
  //           this.setCurrentQuestion(this.questionsStorage[0]);
  //         }
  //       } else {
  //         notify('Error loading data!', 'error');
  //         this.isEnd = true;
  //       }
  //     }, (e) => {
  //       notify(e);
  //     }, () => this.isLoading = false
  //   );
  // }

  updateAnswer(qa: QuestionAnswerModel) {
    if (this.partNumber === 6) {
      this.currentQuestion = this.questionsStorage[qa.id - 1];
    }
    if (!this.currentQuestion.userAnswer) {
      this.currentQuestion.isCorrect = qa.isCorrect;
      this.currentQuestion.userAnswer = qa.userAnswer;
      if (this.currentQuestion.userAnswer) {
        const userId = this.authService.currentUserId;
        if (userId) {
          const input = new QuestionAnswerOutput({
            userId: userId,
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
    }
  }

  clickPrevious() {
    this.isEnd = false;

    if (this.partNumber === 5) {
      this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id - 2]);
    }

    // if (this.partNumber === 6 || this.partNumber === 7) {
    //   this.setCurrentParagraph(this.paragraphsStorage[this.currentPara.id - 2]);
    // }
  }

  clickNext() {
    if (this.partNumber === 5) {
      if (this.questionsStorage[this.currentQuestion.id]) {
        this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id]);
      }
      if (!this.questionsStorage[this.currentQuestion.id + 1]) {
        this.getQuestions();
      }
    }

    // if (this.partNumber === 6 || this.partNumber === 7) {
    //   this.getParagraph();
    // }
  }

  clickEnd() {
    this.router.navigate(['/test']);
  }
}
