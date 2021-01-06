import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})

export class LoginComponent implements OnInit {

  constructor(
    private authservice: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    // If signed in, redirect to dashboard
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
  }

  loginWithGoogle() {
    this.authservice.loginWithGoogle().subscribe(() => {
      this.router.navigate(['dashboard']);
    });
  }
}