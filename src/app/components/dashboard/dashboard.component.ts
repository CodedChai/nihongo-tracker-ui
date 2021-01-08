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


  getUserLoggedIn() {
    this.authservice.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authservice.logout();
    console.log('Logged out');
  }
}