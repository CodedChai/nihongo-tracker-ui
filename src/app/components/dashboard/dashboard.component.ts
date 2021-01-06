import { Component, OnInit } from '@angular/core';
import { User } from './../../interfaces/user';
import { AuthService } from './../../providers/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(
    public authservice: AuthService,
  ) {
    this.getUserLoggedIn();
  }

  ngOnInit() {
  }

  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authservice.logout();
    console.log('Logged out');
  }
}