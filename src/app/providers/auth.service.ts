import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {

  user: User;

  constructor(
    private ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private router: Router,
    public userservice: UserService
  ) {
    this.checkLocalStorage();
  }

  /*
   * If localStoge is empty, we call getDataFromFirebase
   * method set user data from firebase on localStorage
   */
  checkLocalStorage() {
    if (!localStorage.getItem('user')) {
      this.getDataFromFirebase();
    } else {
      console.log('localStorage ready!');
    }
  }

  getDataFromFirebase() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth; // save data firebase on user
        console.log('Authenticated');
        this.userservice.setUserLoggedIn(this.user); // set user data from firebase on local storage
      } else {
        console.log('Not authenticated');
      }
    });
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