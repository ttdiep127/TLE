import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {QtionP5} from '../data/question.mock';

@Injectable({
  providedIn: 'root'
})
export class QuestionStorageService {

  constructor() { }

  getQuestion(partNumber: number){
    return of(QtionP5);
  }
}
