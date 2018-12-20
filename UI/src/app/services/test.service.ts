import {TestResultView, TestSubmitModel, TestTypeModel} from '../models/testInput.model';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {RequestResponse, RequestResult} from '../models/RequestResponse';
import {Injectable} from '@angular/core';
import {QuestionViewModel} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private baseService: BaseService) {
  }

  getTest(typeTest: TestTypeModel): Observable<RequestResponse> {
    return this.baseService.post(`${this.baseService.testUrl}`, typeTest);
  }

  getResult(requestResult: RequestResult): Observable<RequestResponse> {
    return this.baseService.post(`${this.baseService.testUrl}/result`, requestResult);
  }

  getAnswers(testGuidId: string): Observable<QuestionViewModel[]> {
    return this.baseService.get(`${this.baseService.testUrl}/answers/${testGuidId}`);
  }

  getPracticeTest(topicId: number): Observable<RequestResponse> {
    return this.baseService.get(`${this.baseService.testUrl}/practice/${topicId}`);
  }
}
