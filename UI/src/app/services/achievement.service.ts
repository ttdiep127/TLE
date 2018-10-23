import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Rating} from '../models/achievement.model';

@Injectable()
export class AchievementService {

  constructor(private baseService: BaseService) {
  }

  getRatingByUserId(userId: number): Observable<Rating[]> {
    return this.baseService.get(`${this.baseService.achievementUrl}/rating/${userId}`);
  }

}
