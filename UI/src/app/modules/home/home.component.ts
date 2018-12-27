import { Component, OnInit } from '@angular/core';
import {RatingModel} from '../../models/achievement.model';
import {ArchivementComponent} from '../archivement/archivement.component';
import {AuthenticationService} from '../../services/authentication.service';
import {AchievementService} from '../../services/achievement.service';
import {ArticleModel} from '../../models/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userId: number;
  ratings: RatingModel[];
  isLoggedIn: boolean;
  articles: ArticleModel[];
  displayLoginForm: boolean = false;

  constructor(private archService: AchievementService, private authService: AuthenticationService) {
    this.userId = this.authService.currentUserId;
  }

  ngOnInit() {
    this.subscribe = this.authService.subscribeLogin()
    if (this.userId) {
      this.isLoggedIn = true;
      this.archService.getRatingTopics(this.userId).subscribe( (ratings) => {
        this.ratings = ratings;
      });
     } else {
      this.isLoggedIn = false;
    }

    this.archService.getRecommend(this.userId).subscribe((articles) => {
      this.articles = articles.slice(0, 8);
      console.log(this.articles);
    });
  }

  customizeLabelText = (info: any) => {
    return info.valueText + '%';
  };

  reloadPerformance() {
    this.displayLoginForm = false;
    this.userId = this.authService.currentUserId;
    if (this.userId) {
      this.isLoggedIn = true;
      this.archService.getRatingTopics(this.userId).subscribe( (ratings) => {
        this.ratings = ratings;
      });
    } else {
      this.isLoggedIn = false;
    }
  }
}
