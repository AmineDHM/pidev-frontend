import { EventType } from "./../../../services/event-services/event-type";
import { Component, OnInit } from "@angular/core";
import { EventService } from "../../../services/event-services/event.service";
import { UserType } from "../../../services/user-services/user-type";
import { UserService } from "../../../services/user-services/user.service";

@Component({
  selector: "ngx-invite-users",
  templateUrl: "./invite-users.component.html",
  styleUrls: ["./invite-users.component.scss"],
})
export class InviteUsersComponent implements OnInit {
  events: EventType[] = [];
  users: UserType[] = [];

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  onClick(id: number) {
    console.log(id);
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res: EventType[]) => (this.events = res),
    });

    this.userService.getAllUsers().subscribe({
      next: (res: UserType[]) => (this.users = res),
    });
  }
}
