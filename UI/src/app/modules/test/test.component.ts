import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestTypes} from '../../share/enums';
import notify from 'devextreme/ui/notify';
import {Utility} from '../../share/Utility';
import {AuthenticationService} from '../../services/authentication.service';
import {TestService} from '../../services/test.service';
import {TestInputModel, TestTypeModel} from '../../models/testInput.model';
import {UserService} from '../../services/user.service';
import {GuideToeicPart} from '../../data/guideToiecPart';
import {QuestionViewModel} from '../../models/question.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  test: TestInputModel;

  isLoading: boolean;
  isSubmitting: boolean;

  duration: number;
  minutes: number;
  interval: any;

  displayIntroduction: boolean;
  directions: string;
  typeExam: TestTypeModel;

  displayLoginForm: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
              private testService: TestService,
              private userService: UserService, private authService: AuthenticationService) {

    // TODO: Part 5
    this.typeExam = new TestTypeModel( {
      typeId: TestTypes.Part,
      part: 5,
      text: 'Part 5',
      examTime: 30
    });

    this.duration = this.typeExam.examTime * 60;

    // Init UI
    this.isLoading = false;
    this.isSubmitting = false;
    this.displayLoginForm = false;

    this.getDirections();
  }

  ngOnInit() {
    this.isLoading = true;
    this.testService.getTest(this.typeExam).subscribe(rr => {
        if (rr.success) {
          this.test = rr.data as TestInputModel;
          console.log(this.test);
        } else {
          notify(rr.message, 'warning');
        }
      },
      () => notify('Error Server', 'error'), () => this.isLoading = false
    );
  }

  getDirections() {
    if (this.typeExam.typeId === TestTypes.Part) {
      this.directions = GuideToeicPart[this.typeExam.part].directions;
    }

    this.displayIntroduction = true;
  }

  startTest() {
    this.displayIntroduction = false;
    this.interval = setInterval(() => {
      this.duration = this.duration - 1;
      this.minutes = Math.floor(this.duration / 60);
      if (this.duration <= 0) {
        this.onSubmitTest();
      }
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
        window.alert('Đăng nhập để lưu kết quả bài làm!');
        this.displayLoginForm = true;
      } else {
        this.sendAQsToServer();
      }
    }
  }

  sendAQsToServer() {
    const userId = this.authService.currentUserId || null;
    const testSubmit = Utility.ConvertToTestSubmit(this.test, userId);

    testSubmit.totalTime = this.typeExam.examTime * 60 - this.duration;

    if (testSubmit) {
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
    if (this.duration <= 0) {
      alert('Over time!');
      return true;
    }

    if (this.test.questions.find(_ => _.userAnswer === null)) {
      alert('Vui lòng trả lời hết tất cả các câu hỏi trước khi nộp!');
      return false;
    }

    return true;
  }
}
