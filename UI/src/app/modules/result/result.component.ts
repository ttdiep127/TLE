import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {TestService} from '../../services/test.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestResult} from '../../models/RequestResponse';
import {TestResultView} from '../../models/testInput.model';
import {Utility} from '../../share/Utility';
import {AchievementService} from '../../services/achievement.service';
import {ArticleModel} from '../../models/article.model';
import {RatingModel} from '../../models/achievement.model';
import {QuestionViewModel} from '../../models/question.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  userId: number;
  guidId: string;
  testResult: TestResultView;
  timeString: string;
  articles: ArticleModel[];
  isLoading: boolean = true;
  testRatings: RatingModel[];
  answerQuestions: QuestionViewModel[];
  isDisplayResultDetail: boolean = false;
  isPracticing: boolean = false;

  constructor(private authService: AuthenticationService,
              private testService: TestService,
              private route: ActivatedRoute,
              private router: Router,
              private archService: AchievementService) {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.guidId = id;
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.currentUserId;
    const requestResult = new RequestResult({
      userId: this.userId,
      guidId: this.guidId
    });

    this.testService.getResult(requestResult).subscribe((rr) => {
        if (rr.success) {
          this.testResult = rr.data as TestResultView;
          this.timeString = Utility.getTimeString(this.testResult.totalTime);
        } else {
          this.router.navigate(['/test]']);
        }
        this.isLoading = false;
      }
    );

    this.isLoading = true;
    this.archService.getRecommend(this.userId).subscribe((articles) => {
      this.articles = articles;
      console.log(this.articles);
      this.isLoading = false;
    });

    this.archService.getRating(this.guidId).subscribe((ratings) => {
      this.testRatings = ratings;
      if (this.testRatings.length === 2){
        this.isPracticing = true;
      }
      console.log(this.testRatings);
    });

    this.testService.getAnswers(this.guidId).subscribe((answerQuestions) => {
      let index = 1;
      answerQuestions.forEach(_ => {
        _.index = index;
        index += 1;
      });

      this.answerQuestions = answerQuestions;

      console.log(this.answerQuestions);
    });

  }
}
