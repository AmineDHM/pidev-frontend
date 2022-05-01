import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationTopComponent } from './layouts/navigation-top/navigation-top.component';
import { NavigationLeftComponent } from './layouts/navigation-left/navigation-left.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './components/events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationTopComponent,
    NavigationLeftComponent,
    NewsFeedComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    AuthComponent,
    PageNotFoundComponent,
    EventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
