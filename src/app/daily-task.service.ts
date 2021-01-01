import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyTask } from './daily-task/dailyTask';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyTaskService {

  private baseUrl = 'http://localhost:8080/v1';
  private summaryPath = '/tasks';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-USER-NAME': 'Connor',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    })
  };

  constructor(private http: HttpClient) { }

  getTasks(): Observable<DailyTask[]> {
    return this.http.get<DailyTask[]>(this.baseUrl + this.summaryPath, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched tasks')),
        catchError(this.handleError<DailyTask[]>('getTasks', []))
      );;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
