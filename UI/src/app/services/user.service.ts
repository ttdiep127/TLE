import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {QuestionAnswerOutput} from '../models/question.model';
import {Observable} from 'rxjs';
import {RequestResponse} from '../models/RequestResponse';

@Injectable()
export class UserService {

  constructor(private baseService: BaseService) {
  }

  answerQuestion(userId: number, qtionId: number, userAnswer: number, isCorrectAnswer: boolean): Observable<RequestResponse> {
    const questionAnswer = new QuestionAnswerOutput({
      userId : userId,
      answer : userAnswer,
      qtionId : qtionId,
      isCorrect: isCorrectAnswer
    });

    return this.baseService.post(`${this.baseService.userUrl}/answer`, questionAnswer);
  }
}
