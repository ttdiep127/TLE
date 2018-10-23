import {TestInputModel, TestOutputModel} from '../models/testInput.model';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {RequestResponse} from '../models/RequestResponse';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private baseService: BaseService) {
  }

  getTest(typeTest: number): Observable<RequestResponse> {
    return this.baseService.get(`${this.baseService.testUrl}/${typeTest}`);
  }

  saveTest(test: TestInputModel): Observable<RequestResponse> {
    return null;
    // return this.baseService.post(`${this.baseService.testUrl}`, test);
  }

  submitAQs(input: TestOutputModel): Observable<RequestResponse> {

    return this.baseService.post(`${this.baseService.userUrl}/answers`, input);
  }
}
