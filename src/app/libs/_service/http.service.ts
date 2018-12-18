import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
  protected headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'healthClient': 'pci'
  });

  constructor(private http: HttpClient) {
  }

  /**
   * Translate Response Data to JSON
   * @param {Response} response
   */
  private static getJson(response: HttpResponse<any>) {
    return response;
  }

  /**
   * Translate Request Body Data from Object to JSON
   * @param {any} data
   */
  private static getBody(data: any) {
    return (typeof data === 'object') ? JSON.stringify(data) : data;
  }

  /**
   * Catch Response Error
   * @param {Response} response
   */
  private static checkForError(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error['response'] = response;
      throw error;
    }
  }

  /**
   * Set Custom Headers
   * @param headers
   */
  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

  /**
   * HTTP GET METHOD
   * @param  {string}     path
   * @return {Observable}
   */
  get(path: string): Observable<any> {
    return this.http.get(path, {headers: this.headers})
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson);
  }

  /**
   * HTTP GET METHOD
   * @param  {string}     path
   * @return {Observable}
   */
  getText(path: string): Observable<any> {
    return this.http.get(path, {headers: this.headers, responseType: 'text'})
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson);
  }

  /**
   * HTTP POST METHOD
   * @param  {string}     path
   * @param  {any}        body
   * @return {Observable}
   */
  post(path: string, body: any): Observable<any> {
    return this.http.post(path, HttpService.getBody(body), {headers: this.headers})
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson);
  }

  /**
   * HTTP POST METHOD
   * @param  {string}     path
   * @return {Observable}
   */
  postParma(path: string): Observable<any> {
    return this.http.post(path, {
      headers: this.headers
    })
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson)
  }

  /**
   * HTTP PUT METHOD
   * @param  {string}     path
   * @param  {any}        body
   * @return {Observable}
   */
  put(path: string, body: any): Observable<any> {
    return this.http.put(path, HttpService.getBody(body), {headers: this.headers})
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson);
  }

  /**
   * HTTP DELETE METHOD
   * @param  {string}     path
   * @return {Observable}
   */
  del(path: string): Observable<any> {
    return this.http.delete(path, {headers: this.headers})
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson);
  }

  /**
   * HTTP DELETE METHOD
   * @param  {string}     path
   * @return {Observable}
   */
  delParam(path: string): Observable<any> {
    return this.http.delete(path, {
      headers: this.headers
    })
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson);
  }

  /**
   * 上传图片
   */
  upload(path: string, data: any): Observable<any> {
    return this.http.post(path, data, {headers: new HttpHeaders({processData: 'false'})})
    // .map(HttpService.checkForError)
    // .catch(err => Observable.throw(err))
    // .map(HttpService.getJson);
  }
}
