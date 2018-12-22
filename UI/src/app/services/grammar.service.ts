import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {ArticleModel, TopicArticles} from '../models/article.model';

@Injectable()
export class GrammarService {

  constructor(private baseService: BaseService) {
  }

  getArticle(articleId: number): Observable<ArticleModel> {
    return this.baseService.get(`${this.baseService.grammarUrl}/${articleId}`);
  }

  getTopicsArticles(topicIds: number[]): Observable<TopicArticles[]> {
    return this.baseService.post(`${this.baseService.grammarUrl}/topics`, topicIds);
  }

  getAllArticles() {
    return this.baseService.get(`${this.baseService.grammarUrl}/all`);
  }
}
