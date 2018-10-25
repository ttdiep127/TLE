import {Component, Input, OnInit} from '@angular/core';
import {AchievementService} from '../../../services/achievement.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {RatingModel} from '../../../models/achievement.model';
import {TestOutputModel} from '../../../models/testInput.model';
import {ArticleModel} from '../../../models/article.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() test: TestOutputModel;
  correctAnswerNumber: number;
  ratings: RatingModel[]
  articleRecommend: ArticleModel[];

  constructor(private authService: AuthenticationService, private achievementService: AchievementService) {
  }

  ngOnInit() {
    if (this.authService.currentUserId) {
      this.achievementService.getRecommend(this.authService.currentUserId).subscribe(result => {
        if (result) {
          this.articleRecommend = result;
        }
      });
    }
    this.correctAnswerNumber = 0;
    this.test.answers.forEach(answer => {
      if (answer.isCorrect === true) {
        this.correctAnswerNumber++;
      }
    });
  }
}
