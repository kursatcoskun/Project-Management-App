import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  get(path: string, payload?: any): Observable<any> {
    return this.http.get(environment.API_BASE_PATH + path, payload).pipe(catchError(this.formatError));
  }

  post(path: string, payload): Observable<any> {
    return this.http
      .post(environment.API_BASE_PATH + path, payload, this.httpOptions)
      .pipe(catchError(this.formatError));
  }

  put(path: string, payload): Observable<any> {
    return this.http
      .put(environment.API_BASE_PATH + path, JSON.stringify(payload), this.httpOptions)
      .pipe(catchError(this.formatError));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(environment.API_BASE_PATH + path).pipe(catchError(this.formatError));
  }

  private formatError(error: any) {
    return of(environment.API_BASE_PATH + error.error);
  }
}
