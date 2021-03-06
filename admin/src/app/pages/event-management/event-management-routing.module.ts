import { NewEventComponent } from "./new-event/new-event.component";
import { EventManagementComponent } from "./event-management.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShowEventsComponent } from "./show-events/show-events.component";
import { InviteUsersComponent } from "./invite-users/invite-users.component";
import { EventItemComponent } from "./event-item/event-item.component";
import { StatisticsComponent } from "./statistics/statistics.component";

const routes: Routes = [
  {
    path: "",
    component: EventManagementComponent,
    children: [
      {
        path: "new-event",
        component: NewEventComponent,
      },
      {
        path: "show-events",
        component: ShowEventsComponent,
      },
      {
        path: "show-events/:id",
        component: EventItemComponent,
      },
      {
        path: "invite-users",
        component: InviteUsersComponent,
      },
      {
        path: "statistics",
        component: StatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventManagementRoutingModule {}
