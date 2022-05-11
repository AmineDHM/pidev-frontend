import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import {
  EventType,
  ImageType,
} from "../../../services/event-services/event-type";
import { EventService } from "../../../services/event-services/event.service";

@Component({
  selector: "ngx-event-item",
  templateUrl: "./event-item.component.html",
  styleUrls: ["./event-item.component.scss"],
})
export class EventItemComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private tostrService: NbToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  eventId = Number(this.route.snapshot.paramMap.get("id"));
  event!: EventType;
  images: ImageType[];
  invitedUsers = [];
  participatedUsers = [];
  imgArr = [];
  loading = false;

  updateEventForm = this.formBuilder.group({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    venue: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    fees: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
    this.eventService.getEvent(this.eventId).subscribe({
      next: (res: EventType) => {
        this.event = res;
        this.images = res.images;
        this.updateEventForm.patchValue({
          name: res.name,
          description: res.description,
          /* startDate: res.startDate,
          endDate: res.endDate, */
          venue: res.venue,
          city: res.city,
          fees: res.fees,
        });
      },
      error: (err) => console.log(err),
    });

    this.eventService.getInvitedUsers(this.eventId).subscribe({
      next: (res) => (this.invitedUsers = res),
      error: (err) => console.log(err),
    });

    this.eventService.getAcceptedUsers(this.eventId).subscribe({
      next: (res) => (this.participatedUsers = res),
      error: (err) => console.log(err),
    });
  }

  drop(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item) => {
      this.imgArr.push(item);
    });
  }

  reset() {
    this.imgArr = [];
  }

  deleteImage(name: string) {
    this.eventService.deleteImage(name).subscribe({
      next: (res) => {
        if (res.status) {
          this.tostrService.success(res.message, "Success");
          this.images = this.images.filter((img) => img.name != name);
        } else {
          this.tostrService.danger(res.message, "Error");
        }
      },
      error: (err) => {
        this.tostrService.danger("Something went wrong!", "Error");
        console.log(err);
      },
    });
  }

  upload() {
    this.loading = true;
    this.eventService.uploadImagesToEvent(this.eventId, this.imgArr).subscribe({
      next: (res) => {
        if (res.status) {
          this.tostrService.success(res.message, "Success");
        } else {
          this.tostrService.danger(res.message, "Error");
        }
      },
      error: (err) => {
        this.tostrService.danger("Something went wrong!", "Error");
        this.loading = false;
        console.log(err);
      },
      complete: () => (this.loading = false),
    });
  }

  onSubmit() {
    const toUpdateEvent = this.event;
    Object.assign(toUpdateEvent, this.updateEventForm.value);
    this.eventService.updateEvent(toUpdateEvent).subscribe({
      next: (res) => {
        Object.assign(this.event, res);
        this.tostrService.success("Event Update Successfully", "Success");
      },
      error: (err) => {
        this.tostrService.danger("Something went wrong!", "Error");
        console.log(err);
      },
    });
  }
}
