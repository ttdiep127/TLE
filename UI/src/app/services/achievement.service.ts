import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {RatingModel} from '../models/achievement.model';
import {ArticleModel} from '../models/article.model';

@Injectable()
export class AchievementService {

  constructor(private baseService: BaseService) {
  }

  getRating(userId: number): Observable<RatingModel[]> {
    return this.baseService.get(`${this.baseService.achievementUrl}/rating/${userId}`);
  }

  getRecommend(userId: number): Observable<ArticleModel[]> {
    return this.baseService.get(`${this.baseService.achievementUrl}/recommend/${userId}`);
  }
}
