import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {AchievementService} from '../../services/achievement.service';
import {RatingModel} from '../../models/achievement.model';

@Component({
  selector: 'app-archivement',
  templateUrl: './archivement.component.html',
  styleUrls: ['./archivement.component.css']
})
export class ArchivementComponent implements OnInit {

  userId: number;
  ratings: any;
  constructor(private authService: AuthenticationService, private archService: AchievementService) {
    this.userId = this.authService.currentUserId;
  }

  ngOnInit() {
    this.archService.getUserRating(this.userId).subscribe((rr) => {
      if (rr.success) {
        this.ratings = rr.data;
        console.log(this.ratings);
      }
    });
  }

}
