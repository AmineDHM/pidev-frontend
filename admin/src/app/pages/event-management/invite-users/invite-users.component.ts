import { EventType } from "./../../../services/event-services/event-type";
import { Component, OnInit } from "@angular/core";
import { EventService } from "../../../services/event-services/event.service";
import { UserType } from "../../../services/user-services/user-type";
import { UserService } from "../../../services/user-services/user.service";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "ngx-invite-users",
  templateUrl: "./invite-users.component.html",
  styleUrls: ["./invite-users.component.scss"],
})
export class InviteUsersComponent implements OnInit {
  events: EventType[] = [];
  users: UserType[] = [];
  selectedEvent: number = null;
  selectedUsers: number[] = [];

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res: EventType[]) => (this.events = res),
    });

    this.userService.getAllUsers().subscribe({
      next: (res: UserType[]) => (this.users = res),
    });
  }

  onClick(id: number) {
    this.selectedEvent = id === this.selectedEvent ? null : id;
  }

  addUser(id: number) {
    if (this.selectedUsers.includes(id)) {
      this.selectedUsers = this.selectedUsers.filter((u) => u !== id);
    } else {
      this.selectedUsers.push(id);
    }
  }

  invite() {
    console.log(this.selectedEvent);
    console.log(this.selectedUsers);
    this.eventService
      .inviteUsers(this.selectedEvent, this.selectedUsers)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status) {
            this.toastrService.success(res.message, "Success");
          } else {
            this.toastrService.danger(res.message, "Error");
          }
        },
        error: (err) => {
          this.toastrService.danger("Something went wrong", "Error");

          console.log(err);
        },
      });
  }
}
