import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';

import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class BaseService {
  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  protected get url() {
    return this.baseURL;
  }

  private static get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // "Accept": "q=0.8;application/json;q=0.9",
      // "APIKey": "~123456789~",
      // "Authorization": "Bearer " + this.cookieService.get("AccessToken")
    });
  }

  private static get options(): any {
    return {
      headers: BaseService.headers
    };
  }

  private static extractData(res: Response) {
    return res || {};
  }

  private static handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg);
    return throwError(errMsg);
  }

  get(url: string): Observable<any> {
    return this.http
      .get(`${this.baseURL}/${url}`, BaseService.options)
      .pipe(
        catchError(BaseService.handleError)
      );
  }

  getWithDynamicQueryTerm(url: string, key: string, val: string): Observable<any> {
    return this.http
      .get(`${this.baseURL}/${url}/?${key}=${val}`, BaseService.options)
      .pipe(catchError(BaseService.handleError));
  }

  getWithFixedQueryString(url: string, param: any): Observable<any> {
    const params = new HttpParams().append('query', param);
    const options = {headers: BaseService.headers, params: params};
    return this.http
      .get(`${this.baseURL}/${url}`, options)
      .pipe(map(BaseService.extractData), catchError(BaseService.handleError));
  }

  getWithObjectAsQueryString(url: string, param: any): Observable<any> {
    const params: HttpParams = new HttpParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    const options = {headers: BaseService.headers, params: params};
    return this.http
      .get(`${this.baseURL}/${url}`, options)
      .pipe(map(BaseService.extractData), catchError(BaseService.handleError));
  }

  post(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .post(`${this.baseURL}/${url}`, body, BaseService.options)
      .pipe(catchError(BaseService.handleError));
  }

  update(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .put(`${this.baseURL}/${url}`, body, BaseService.options)
      .pipe(catchError(BaseService.handleError));
  }

  patch(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .patch(`${this.baseURL}/${url}`, body, BaseService.options)
      .pipe(catchError(BaseService.handleError));
  }

  delete(url: string, param: any): Observable<any> {
    const params: HttpParams = new HttpParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    const options = {headers: BaseService.headers, params: params};
    return this.http
      .delete(`${this.baseURL}/${url}`, options)
      .pipe(map(BaseService.extractData), catchError(BaseService.handleError));
  }

  deleteWithKey(url: string, key: string, val: string): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${url}/?${key}=${val}`, BaseService.options)
      .pipe(catchError(BaseService.handleError));
  }
}
