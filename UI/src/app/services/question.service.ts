import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BaseService} from './base.service';
import {ParagraphModel} from '../models/paragraph.model';
import {RequestResponse} from '../models/RequestResponse';
import {AnswerSubmitModel, QuestionViewModel} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private baseService: BaseService) {
  }

  // getQuestions(partNumber: number): Observable<QuestionViewModel[]> {
  //   return this.baseService.get(`${this.baseService.questionUrl}/${partNumber}`);
  // }
  //
  // getQuestionsTopic(topicId: number): Observable<QuestionViewModel[]> {
  //   return this.baseService.get(`${this.baseService.questionUrl}/topic/${topicId}`);
  // }
  //
  // getParagraph(partNumber: number): Observable<ParagraphModel> {
  //   return this.baseService.get(`${this.baseService.questionUrl}/para/${partNumber}`);
  // }

  // addQuestions(questions: QuestionModel[]): Observable<RequestResponse> {
  //   const questionsRequest = new AnswerSubmitModel({
  //     questions: questions
  //   });
  //   return this.baseService.post(`${this.baseService.questionUrl}`, questionsRequest);
  // }
}
