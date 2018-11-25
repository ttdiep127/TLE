import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {ArticleModel} from '../models/article.model';

@Injectable()
export class GrammarService {

  constructor(private baseService: BaseService) {
  }

  getArticle(articleId: number): Observable<ArticleModel> {
    return this.baseService.get(`${this.baseService.grammarUrl}/${articleId}`);
  }
}
