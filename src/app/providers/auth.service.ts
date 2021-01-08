import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable, from, of, EMPTY } from 'rxjs';

@Injectable()
export class AuthService {

  user: User;

  constructor(
    private ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): Observable<User> {
    if (!localStorage.getItem('user')) {
      return this.getDataFromFirebase();
    }

    console.log("found user in local storage");

    return of(JSON.parse(localStorage.getItem('user')));
  }

  getDataFromFirebase(): Observable<User> {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth; // save data firebase on user
        console.log('Authenticated');
        localStorage.setItem('user', JSON.stringify(auth));
        localStorage.setItem('userId', auth.uid);
        console.log('saved to localStorage');

        return auth;
      } else {
        console.log('Not authenticated');
      }
    });

    return EMPTY;
  }

  loginWithGoogle(): Observable<firebase.auth.UserCredential> {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(authProvider));
  }

  logout() {
    localStorage.clear();
    this.afAuth.signOut();
  }
}