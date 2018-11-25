import {Component, Input, OnInit} from '@angular/core';
import {AchievementService} from '../../../services/achievement.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {RatingModel} from '../../../models/achievement.model';
import {TestOutputModel} from '../../../models/testInput.model';
import {ArticleModel} from '../../../models/article.model';
// import 'jquery';
// import 'owl.carousel/dist/owl.carousel.min';

// declare var jQuery: any;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() test: TestOutputModel;
  @Input() spendTime: number;
  correctAnswerNumber: number;
  articleRecommend: ArticleModel[];
  minutes: number;
  isDisplayRecommend: boolean;
  weaknessGrammars: RatingModel[];
  isDisplayWeaknessGrammar: boolean;
  mySlideOptions: any;

  constructor(private authService: AuthenticationService, private achievementService: AchievementService) {
    this.isDisplayRecommend = false;
  }

  ngOnInit() {
    this.mySlideOptions = {items: 5, dots: false, nav: true, loop: true};
    if (this.authService.currentUserId) {
      const userId = this.authService.currentUserId;
      this.achievementService.getRecommend(userId).subscribe(result => {
        if (result) {
          this.articleRecommend = result;
          this.isDisplayRecommend = true;
        }
      });
      this.achievementService.getRating(userId).subscribe( ratings => {
        this.weaknessGrammars = ratings;
        this.isDisplayWeaknessGrammar = true;
      });
    }
    this.correctAnswerNumber = 0;
    this.test.answers.forEach(answer => {
      if (answer.isCorrect === true) {
        this.correctAnswerNumber++;
      }
    });
    this.minutes = Math.floor(this.spendTime / 60);
  }

}
