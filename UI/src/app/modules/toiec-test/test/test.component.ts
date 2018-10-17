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

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  testType: number;
  TESTTYPES = TestTypes;
  questionsPart5: QuestionAnswerModel[];
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


  constructor(private route: ActivatedRoute, private router: Router,
              private questionService: QuestionService,
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
  }

  ngOnInit() {
    this.index = 1;
    if (this.testType === TestTypes.Part5) {
      this.isLoading = true;
      this.questionService.getQuestions(5).subscribe(qtions => {
          if (qtions) {
            this.questionsPart5 = [];
            qtions.forEach(qtion => {
              const temp = new QuestionAnswerModel({
                id: this.index,
                isCorrect: false,
                question: qtion
              });
              this.index += 1;
              this.questionsPart5.push(temp);
            });
          } else {
            notify('Question Empty!', 'warning');
          }
        },
        () => notify('Error Server', 'error'), () => this.isLoading = false
      );
    }
  }

  startTest(e) {
    this.inIntroduce = false;
    const interval = setInterval(() => {
      this.duration = this.duration - 1;
      this.minutes = Math.floor(this.duration / 60);
      if (this.duration <= 0) {
        clearInterval(interval);
        this.onSubmit();
      }
    }, 1000);
  }

  onSubmit() {
    if (this.checkAnswerAllQuestion()) {
      this.isSubmitting = true;
      if (this.questionsPart5) {
        // display result
        if (this.userId) {
          const output = Utility.toQuestionAnswerOutput(this.questionsPart5, this.userId);
          if (output) {
            this.userService.submitAQs(output).subscribe(rr => {
              if (rr.success) {
              } else {
                notify(rr.message, 'warning');
              }
            }, (er) => notify(er, 'error'), () => this.isSubmitting = false);
          }
        }
      }
    }
    return;
  }

  displayResult() {
    this.correctQuestions = 0;
    this.questionsPart5.forEach(aq => {
      if (aq.isCorrect) {
        this.correctQuestions += 1;
      }
    });
  }

  checkAnswerAllQuestion(): boolean {

    if (this.duration <= 0) {
      alert('Over time!');
      return true;
    }

    let checkedAll = true;
    this.questionsPart5.forEach(qtion => {
      if (qtion.userAnswer) {
        checkedAll = false;
      }
    });

    if (!checkedAll) {
      return confirm('You did not finish all questions. Do you want to submit this test? ');
    }
    return true;
  }
}
