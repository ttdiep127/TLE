import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {UserService} from '../../../services/user.service';
import {TestTypes} from '../../../share/enums';
import {QuestionAnswerModel, QuestionAnswerOutput, QuestionModel} from '../../../models/question.model';
import notify from 'devextreme/ui/notify';
import {Utility} from '../../../share/Utility';
import {GuideToiecPartV} from '../../../data/guideToiecPart';
import {AuthenticationService} from '../../../services/authentication.service';
import {TestService} from '../../../services/test.service';
import {TestInputModel, TestOutputModel} from '../../../models/testInput.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  testType: number;
  TESTTYPES = TestTypes;
  questions: QuestionAnswerModel[];
  test: TestInputModel;
  isLoading: boolean;
  index: number;
  isSubmitting: boolean;
  userId: number;
  correctQuestions: number;
  duration: number;
  minutes: number;
  inIntroduce: boolean;
  guideToiecPart = GuideToiecPartV;
  partNumber: number;
  displayTestResult: boolean;
  interval: any;


  constructor(private route: ActivatedRoute, private router: Router,
              private testService: TestService,
              private userService: UserService, private autheService: AuthenticationService) {
    this.userId = this.autheService.currentUserId;
    this.route.params.subscribe(params => {
      const id = params['id'];

      switch (id) {
        case 'full': {
          this.testType = TestTypes.FullTest;
          break;
        }
        case 'short': {
          this.testType = TestTypes.ShortTest;
          break;
        }
        case 'part5': {
          this.testType = TestTypes.Part5;
          this.duration = 30;
          this.partNumber = 5;
          break;
        }
        case 'part6': {
          this.testType = TestTypes.Part6;
          break;
        }
        case 'part7': {
          this.testType = TestTypes.Part7;
          break;
        }
        default: {
          router.navigate(['test']);
          break;
        }
      }
    });
    this.isLoading = false;
    this.isSubmitting = false;
    this.inIntroduce = true;
    this.duration = 60 * this.duration;
    this.displayTestResult = false;
  }

  ngOnInit() {
    this.index = 1;
    this.isLoading = true;
    this.testService.getTest(this.TESTTYPES.Part5).subscribe(rr => {
        if (rr.success) {
          this.test = rr.obj;
          this.questions = [];
          this.test.questions.forEach(qtion => {
            const temp = new QuestionAnswerModel({
              id: this.index,
              isCorrect: false,
              question: qtion
            });
            this.index += 1;
            this.questions.push(temp);
          });
        } else {
          notify('Question Empty!', 'warning');
        }
      },
      () => notify('Error Server', 'error'), () => this.isLoading = false
    );
  }

  startTest(e) {
    this.inIntroduce = false;
    this.interval = setInterval(() => {
      this.duration = this.duration - 1;
      this.minutes = Math.floor(this.duration / 60);
      if (this.duration <= 0) {
        this.onSubmit();
      }
    }, 1000);
  }

  onSubmit() {
    if (this.checkAnswerAllQuestion()) {
      clearInterval(this.interval);
      this.isSubmitting = true;
      if (this.questions) {
        if (this.userId) {
          const output = Utility.toQuestionAnswerOutput(this.questions, this.userId);
          if (output) {
            const testOutput = new TestOutputModel({
              id: this.test.id,
              typeId: this.test.typeId,
              answers: output
            });

            this.testService.submitAQs(testOutput).subscribe(rr => {
              if (rr.success) {
                this.displayTestResult = true;
                // Load result

              } else {
                notify(rr.message, 'warning');
              }
            }, (er) => notify(er, 'error'), () => this.isSubmitting = false);
          }
        }
      }
    } else {
      return;
    }
    window.scrollTo(0, 0);
  }

  checkAnswerAllQuestion(): boolean {

    if (this.duration <= 0) {
      alert('Over time!');
      return true;
    }

    if (this.questions.find(_ => _.userAnswer === undefined)) {
      alert('Please answers all the questions before submit!');
      return false;
    }
    debugger;

    return true;
  }
}
