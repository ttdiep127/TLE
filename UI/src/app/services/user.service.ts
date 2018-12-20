import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {RequestResponse} from '../models/RequestResponse';
import {TestSubmitModel} from '../models/testInput.model';

@Injectable()
export class UserService {

  constructor(private baseService: BaseService) {
  }

  // answerQuestion(input: QuestionAnswerOutput): Observable<RequestResponse> {
  //   return this.baseService.post(`${this.baseService.userUrl}/answer`, input);
  // }

  submitTest(input: TestSubmitModel): Observable<RequestResponse> {
    return this.baseService.post(`${this.baseService.userUrl}/submit`, input);
  }
}
