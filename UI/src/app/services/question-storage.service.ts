import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {BaseService} from './base.service';
import {QuestionModel} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionStorageService {

  constructor(private baseService: BaseService) { }

  getQuestion(partNumber: number): Observable<QuestionModel[]> {
    return this.baseService.get(`${this.baseService.questionUrl}/${partNumber}`);
  }
}
