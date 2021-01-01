import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyTask } from './daily-task/dailyTask';

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

  getTasks(): Observable<DailyTask> {
    return this.http.get<DailyTask>(this.baseUrl + this.summaryPath, this.httpOptions);
  }

}
