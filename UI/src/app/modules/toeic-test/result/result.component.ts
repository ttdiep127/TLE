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
  ratings: RatingModel[];
  articleRecommend: ArticleModel[];
  minutes: number;
  isDisplayRecommend: boolean;

  constructor(private authService: AuthenticationService, private achievementService: AchievementService) {
    this.isDisplayRecommend = false;
  }

  ngOnInit() {
    // jQuery('.owl-carousel').owlCarousel();
    //
    // jQuery('.owl-carousel').owlCarousel({
    //   loop: true,
    //   margin: 10,
    //   responsiveClass: true,
    //   rewind: true,
    //   responsive: {
    //     0: {
    //       items: 1,
    //       nav: true,
    //       loop: false,
    //     },
    //     600: {
    //       items: 3,
    //       nav: false,
    //       loop: false,
    //     },
    //     1000: {
    //       items: 5,
    //       loop: false,
    //       nav: true
    //     }
    //   }
    // });
    if (this.authService.currentUserId) {
      this.achievementService.getRecommend(this.authService.currentUserId).subscribe(result => {
        if (result) {
          this.articleRecommend = result;
          this.isDisplayRecommend = true;
        }
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
