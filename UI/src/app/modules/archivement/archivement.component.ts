import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {AchievementService} from '../../services/achievement.service';
import {RatingModel, TopicRatingModel} from '../../models/achievement.model';

@Component({
  selector: 'app-archivement',
  templateUrl: './archivement.component.html',
  styleUrls: ['./archivement.component.scss']
})
export class ArchivementComponent implements OnInit {

  userId: number;
  ratings: any;
  currentRatings: RatingModel[];
  isLoggedIn: boolean = false;
  selectTopic: number = 1;

  constructor(private authService: AuthenticationService, private archService: AchievementService) {
    this.userId = this.authService.currentUserId;

  }

  ngOnInit() {
    if (this.userId) {
      this.archService.getRatingTopics(this.userId).subscribe((ratings) => {
        this.isLoggedIn = true;
        this.currentRatings = ratings;
      });
    } else {
      this.isLoggedIn = false;
    }

    this.archService.getUserRating(this.userId).subscribe((rr) => {
      if (rr.success) {
        this.ratings = rr.data as TopicRatingModel[];
        console.log(this.ratings);
      }
    });
  }

  customizeLabelText = (info: any) => {
    return info.valueText + '%';
  };

}
