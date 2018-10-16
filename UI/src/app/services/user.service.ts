import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {QuestionAnswerOutput} from '../models/question.model';
import {Observable} from 'rxjs';
import {RequestResponse} from '../models/RequestResponse';

@Injectable()
export class UserService {

  constructor(private baseService: BaseService) {
  }

  answerQuestion(input: QuestionAnswerOutput): Observable<RequestResponse> {
    return this.baseService.post(`${this.baseService.userUrl}/answer`, input);
  }

  submitAQs(answerQtion: QuestionAnswerOutput[]): Observable<RequestResponse> {
    const input = {
      'answerQuestions': answerQtion
    };
    return this.baseService.post(`${this.baseService.userUrl}/answers`, input);
  }
}
