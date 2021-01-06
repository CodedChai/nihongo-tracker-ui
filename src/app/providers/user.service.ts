import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  setUserLoggedIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('saved to localStorage');
  }

  getUserLoggedIn() {
    if (localStorage.getItem('user')) {
      JSON.parse(localStorage.getItem('user'));
    } else {
      console.log('localStorage is empty');
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}