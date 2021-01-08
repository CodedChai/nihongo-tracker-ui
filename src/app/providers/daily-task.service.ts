import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyTask } from '../interfaces/dailyTask';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DailyTaskService {

  private baseUrl = 'http://localhost:8080/v1/tasks/';
  private createPath = 'create';
  private updateToCompletPath = '/complete';

  private user: User;

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private authservice: AuthService
  ) {
    this.initUser();
  }

  ngOnInit() {
  }

  initUser(): User {
    if (!this.user) {
      this.authservice.getUser().subscribe(user => {
        this.user = user;
        console.log('set user');
        return user;
      });
    } else {
      console.log('user already set');
      return this.user;
    }
  }

  getTasks(): Observable<DailyTask[]> {

    console.log(`user ${JSON.stringify(this.user)}`);

    return this.http.get<DailyTask[]>(this.baseUrl)
      .pipe(
        tap(_ => console.log('fetched tasks')),
        catchError(this.handleError<DailyTask[]>('getTasks', []))
      );
  }

  addNewTask(chapterNumber: number, pageNumber: number, dueDate: string): Observable<DailyTask> {
    let dailyTask = new DailyTask(pageNumber, chapterNumber, dueDate, this.user.uid);

    return this.http.post<DailyTask>(this.baseUrl + this.createPath, dailyTask)
      .pipe(
        tap((dailyTask: DailyTask) => console.log(`added task ${dailyTask}`)),
        catchError(this.handleError<DailyTask>('addNewTask'))
      );
  }

  updateTaskToComplete(dailyTask: DailyTask): Observable<DailyTask> {

    if (!dailyTask._id || dailyTask.isComplete) { return of(dailyTask); }

    return this.http.put<DailyTask>(this.baseUrl + dailyTask._id + this.updateToCompletPath, dailyTask)
      .pipe(
        tap((dailyTask: DailyTask) => console.log(`completed task ${dailyTask}`)),
        catchError(this.handleError<DailyTask>('updateTaskToComplete'))
      );
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
