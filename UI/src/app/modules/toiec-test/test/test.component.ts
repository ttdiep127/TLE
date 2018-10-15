import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {UserService} from '../../../services/user.service';
import {TestTypes} from '../../../share/enums';
import {QuestionAnswerModel, QuestionModel} from '../../../models/question.model';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testType: number;
  TESTTYPES = TestTypes;
  questionsPart5: QuestionAnswerModel[];
  isLoading: boolean;
  index: number;


  constructor(private route: ActivatedRoute, private router: Router,
              private questionService: QuestionService,
              private userService: UserService) {
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

}
