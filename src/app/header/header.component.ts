import { catchError, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<firebase.User> = this.auth.user$;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  login() {
    this.auth
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
          console.log(`error ${error} when logging in`);
          return EMPTY;
        }),
      )
      .subscribe(
        (response) =>
          response &&
          console.log(`signed in ${response}`),
      );
  }

  logout() {
    this.auth
      .logout()
      .pipe(take(1))
      .subscribe((response) => {
        console.log(`logged out ${response}`);
      });
  }
}