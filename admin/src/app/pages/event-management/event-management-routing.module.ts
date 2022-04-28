import { NewEventComponent } from './new-event/new-event.component';
import { EventManagementComponent } from './event-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowEventsComponent } from './show-events/show-events.component';
import { InviteUsersComponent } from './invite-users/invite-users.component';

const routes: Routes = [
  {
    path: '',
    component: EventManagementComponent,
    children: [
      {
        path: 'new-event',
        component: NewEventComponent
      },
      {
        path: 'show-events',
        component: ShowEventsComponent
      },
      {
        path: 'invite-users',
        component: InviteUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagementRoutingModule { }
