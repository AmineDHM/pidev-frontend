import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { EventsComponent } from './components/events/events.component';
import { MainComponent } from './components/main/main.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Settings' },
      },
      {
        path: 'news-feed',
        component: NewsFeedComponent,
        data: { title: 'News Feed' },
      },
      {
        path: 'events',
        component: EventsComponent,
        data: { title: 'Events' },
      },
      {
        path: 'events/:id',
        component: EventItemComponent,
        data: { title: 'Event' },
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'Notifications' },
      },
      {
        path: 'pay',
        component: PaymentComponent,
        data: { title: 'Payment' },
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register' },
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        data: { title: 'Forget Password' },
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: { title: 'Change Password' },
      },
    ],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
