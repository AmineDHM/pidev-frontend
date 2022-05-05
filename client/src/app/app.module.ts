import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationTopComponent } from './layouts/navigation-top/navigation-top.component';
import { NavigationLeftComponent } from './layouts/navigation-left/navigation-left.component';
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
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapComponent } from './components/map/map.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { LightboxModule } from 'ngx-lightbox';
import { StarRatingModule } from 'angular-star-rating';
import { ProfanityFilterPipe } from './pipes/profanity-filter-pipe.pipe';

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
    MapComponent,
    EventItemComponent,
    ProfanityFilterPipe,
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
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken,
    }),
    LightboxModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
