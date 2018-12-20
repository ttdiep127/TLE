import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {RatingModel} from '../models/achievement.model';
import {ArticleModel} from '../models/article.model';
import {RequestResponse} from '../models/RequestResponse';

@Injectable()
export class AchievementService {

  constructor(private baseService: BaseService) {
  }

  getRating(guidId: string): Observable<RatingModel[]> {
    return this.baseService.get(`${this.baseService.achievementUrl}/rating/${guidId}`);
  }

  getRecommend(userId: number): Observable<ArticleModel[]> {
    return this.baseService.get(`${this.baseService.achievementUrl}/recommend/${userId}`);
  }

  getUserRating(userId: number): Observable<RequestResponse> {
    return this.baseService.get(`${this.baseService.achievementUrl}/user/${userId}`);
  }
}
