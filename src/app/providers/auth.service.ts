import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Observable, from, of, EMPTY } from 'rxjs';

@Injectable()
export class AuthService {

  user: User;

  constructor(
    private ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private router: Router,
    public userservice: UserService
  ) {
  }

  ngOnInit() {
    this.getUser();
  }

  async getUser(): Promise<User> {
    if (!localStorage.getItem('user')) {
      return await this.getDataFromFirebase().toPromise();
    }

    return JSON.parse(localStorage.getItem('user'));
  }

  getDataFromFirebase(): Observable<User> {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth; // save data firebase on user
        console.log('Authenticated');
        this.userservice.setUserLoggedIn(this.user); // set user data from firebase on local storage
        return this.user;
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
    this.userservice.clearLocalStorage();
    this.afAuth.signOut();
  }
}