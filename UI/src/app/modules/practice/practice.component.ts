import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {cloneDeep} from 'lodash';
import {ParagraphModel} from '../../models/paragraph.model';
import {QuestionService} from '../../services/question.service';
import {AuthenticationService} from '../../services/authentication.service';
import {GuideToeicPart} from '../../data/guideToiecPart';
import {QuestionViewModel} from '../../models/question.model';
import {TestService} from '../../services/test.service';
import {TestInputModel} from '../../models/testInput.model';
import notify from 'devextreme/ui/notify';
import {Utility} from '../../share/Utility';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  topicId: number;
  test: TestInputModel;
  paramsSub: any;
  isLoading: boolean;

  isSubmitting: boolean;
  duration: number = 0;
  interval: any;

  displayLoginForm: boolean = false;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router,
              private testService: TestService,
              private userService: UserService) {
    this.paramsSub = this.route.params.subscribe(params => {
      const topicId = params['topicId'];
       if (!isNaN(topicId)) {
         this.topicId = topicId;
       } else {
         this.router.navigate(['/home']);
       }
    });
    // this.inIntroduce = true;
    // this.questionsStorage = [];
    // this.paragraphsStorage = [];
    // this.isLoading = false;
    // this.isEnd = false;
    // this.isFirstQuestion = false;
  }

  ngOnInit() {
    this.testService.getPracticeTest(this.topicId).subscribe( (rr) => {
      if (rr.success) {
        this.test = rr.data as TestInputModel;
        console.log(this.test);
        this.startTest();
      }
    });
  }

  startTest() {
    this.interval = setInterval(() => {
      this.duration = this.duration + 1;
    }, 1000);
  }

  changeAnswer(qa: QuestionViewModel) {
    // TODO: user answer a question
    this.test.questions[qa.index - 1] = qa;
  }

  onSubmitTest() {
    if (this.isFinishTest()) {
      clearInterval(this.interval);
      this.isSubmitting = true;

      const userId = this.authService.currentUserId;

      if (!userId) {
        window.alert('Login to save your result for view your achievements.');
        this.displayLoginForm = true;
      } else {
        this.sendAQsToServer();
      }
    }
  }

  sendAQsToServer() {
    const userId = this.authService.currentUserId || null;
    const testSubmit = Utility.ConvertToTestSubmit(this.test, userId);

    testSubmit.totalTime = this.duration;

    if (testSubmit) {
      debugger;
      this.userService.submitTest(testSubmit).subscribe(rr => {
        if (rr.success) {
          const testResultGuidId = rr.data as string;
          this.router.navigate(['/result', testResultGuidId]);
        } else {
          notify(rr.message, 'warning');
          this.isSubmitting = false;
        }
      }, (er) => notify(er, 'error'));
    }
  }

  isFinishTest(): boolean {
    // if (this.test.questions.find(_ => _.userAnswer === undefined)) {
    //   alert('Please answers all the questions before submit!');
    //   return false;
    // }

    return true;
  }
  // setCurrentQuestion(questionAnswer: QuestionViewModel) {
  //   if (questionAnswer) {
  //     this.currentQuestion = questionAnswer;
  //     // if (this.currentQuestion.userAnswer) {
  //     //   this.correctAnswer = this.displayAnswer(this.currentQuestion);
  //     // }
  //
  //     if (this.currentQuestion === this.questionsStorage[0]) {
  //       this.isFirstQuestion = true;
  //     } else {
  //       this.isFirstQuestion = false;
  //     }
  //   }
  // }

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

  // resetQuestionStorage(questions: QuestionViewModel[]): QuestionViewModel[] {
  //   const storage: QuestionViewModel[] = [];
  //   questions.forEach(qtion => {
  //     const questionAnswer = new QuestionViewModel({
  //       id: qtion.index,
  //       question: qtion
  //     });
  //     storage.push(questionAnswer);
  //   });
  //
  //   return storage;
  // }

  // addQuestions(qtions: QuestionModel[]) {
  //   qtions.forEach(qtion => {
  //     const questionAnswer = new QuestionAnswerModel();
  //     questionAnswer.question = qtion;
  //     questionAnswer.id = this.count;
  //     this.questionsStorage.push(questionAnswer);
  //     this.count += 1;
  //   });
  //   debugger;
  //   if (!this.currentQuestion) {
  //     this.setCurrentQuestion(this.questionsStorage[0]);
  //   }
  // }
  //
  // getQuestions() {
  //   if (this.topicNumber) {
  //     this.isLoading = true;
  //     debugger;
  //     this.questionService.getQuestionsTopic(this.topicNumber).subscribe((qs) => {
  //       this.addQuestions(qs);
  //     }, (er) => notify(er), () => this.isLoading = false);
  //   } else {
  //     if (this.partNumber === 5) {
  //       this.isLoading = true;
  //       this.questionService.getQuestions(this.partNumber).subscribe((qs) => {
  //         this.addQuestions(qs);
  //       }, (er) => notify(er), () => this.isLoading = false);
  //     }
  //   }
  // }

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

  // updateAnswer(qa: QuestionAnswerModel) {
  //   if (this.partNumber === 6) {
  //     this.currentQuestion = this.questionsStorage[qa.id - 1];
  //   }
  //   if (!this.currentQuestion.userAnswer) {
  //     this.currentQuestion.isCorrect = qa.isCorrect;
  //     this.currentQuestion.userAnswer = qa.userAnswer;
  //     if (this.currentQuestion.userAnswer) {
  //       const userId = this.authService.currentUserId;
  //       if (userId) {
  //         const input = new QuestionAnswerOutput({
  //           userId: userId,
  //           answer: qa.userAnswer,
  //           qtionId: qa.question.id,
  //           isCorrect: qa.isCorrect
  //         });
  //         this.userService.answerQuestion(input).subscribe((rr) => {
  //             if (!rr.success) {
  //               notify(rr.message, 'warning');
  //               this.clickNext();
  //             }
  //           }, () => notify('Error Server', 'error')
  //         );
  //       }
  //     }
  //   }
  // }
  //
  // clickPrevious() {
  //   this.isEnd = false;
  //
  //   if (this.partNumber === 5) {
  //     this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id - 2]);
  //   }
  //
  //   // if (this.partNumber === 6 || this.partNumber === 7) {
  //   //   this.setCurrentParagraph(this.paragraphsStorage[this.currentPara.id - 2]);
  //   // }
  // }
  //
  // clickNext() {
  //   if (this.partNumber === 5) {
  //     if (this.questionsStorage[this.currentQuestion.id]) {
  //       this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id]);
  //     }
  //     if (!this.questionsStorage[this.currentQuestion.id + 1]) {
  //       this.getQuestions();
  //     }
  //   }
  //
  //   // if (this.partNumber === 6 || this.partNumber === 7) {
  //   //   this.getParagraph();
  //   // }
  // }
  //
  // clickEnd() {
  //   this.router.navigate(['/test']);
  // }
}
