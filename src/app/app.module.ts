import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AuthService } from './providers/auth.service';
import { HeaderInterceptor } from './providers/header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DailyTaskComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppFirebaseModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true // Add this line when using multiple interceptors.
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
