import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {AchievementService} from '../../services/achievement.service';
import {RatingModel, TopicRatingModel} from '../../models/achievement.model';
import {UserInfo} from '../../models/account.model';
import {ActivatedRoute, Router} from '@angular/router';

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
  displayLoginForm: boolean = false;

  constructor(private authService: AuthenticationService, private archService: AchievementService, private router: Router) {
    this.userId = this.authService.currentUserId;
    this.isLoggedIn = false;
  }

  ngOnInit() {
    if (this.userId) {
      this.isLoggedIn = true;
      this.getTracking(this.userId);
    } else {
      window.alert('Đăng nhập để xem chức năng này');
      this.displayLoginForm = true;
    }

    this.authService.handleSubscribeLogin().subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.getTracking(this.userId);
      }
    });
  }

  getTracking(userId: number) {
    if (userId) {
      this.archService.getRatingTopics(userId).subscribe((ratings) => {
        this.isLoggedIn = true;
        this.currentRatings = ratings;
      });

      this.archService.getUserRating(userId).subscribe((rr) => {
        if (rr.success) {
          this.ratings = rr.data as TopicRatingModel[];
          console.log(this.ratings);
        }
      });
    }
  }

  onLogin(user: UserInfo) {
    this.isLoggedIn = true;
    this.displayLoginForm = false;
    this.getTracking(user.id);
  }

  onCancelLogin() {
    this.router.navigate(['/home']);
  }

  customizeLabelText = (info: any) => {
    return info.valueText + '%';
  };
}
