import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyTaskComponent } from './daily-task/daily-task.component';
import { HttpClientModule } from '@angular/common/http';

import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [
    AppComponent,
    DailyTaskComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppFirebaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
