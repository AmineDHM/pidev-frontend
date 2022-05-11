import { CoordinatesType } from "./../map/map.component";
import { EventService } from "./../../../services/event-services/event.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";

@Component({
  selector: "ngx-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.scss"],
})
export class NewEventComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {}

  loading = false;
  banner = null;
  coordinates: CoordinatesType;

  addEventForm = this.formBuilder.group({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    venue: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    fees: new FormControl("", Validators.required),
  });

  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    this.toastrService.show(body, title, config);
  }

  onBannerChange(event) {
    this.banner = event.target.files[0];
  }

  getCoordinates(coordinates: CoordinatesType) {
    this.coordinates = coordinates;
  }

  onSubmit(): void {
    console.log(this.addEventForm.value);
    console.log(this.coordinates);
    this.loading = true;
    this.eventService
      .addEvent({ ...this.addEventForm.value, ...this.coordinates })
      .subscribe(
        (res) => {
          this.eventService.uploadEventBanner(this.banner, res).subscribe(
            () => console.log("file uploaded successfully"),
            (err) =>
              console.log("something went wrong while upload file ", err),
            () => {
              this.loading = false;
              this.addEventForm.reset();
              this.showToast(
                "success",
                "Success",
                "Event is Added Successfully !"
              );
            }
          );
        },
        (err) => {
          console.log("error ", err);
          this.showToast("danger", "Error", "Something Went Wrong Try Again !");
          this.loading = false;
        }
      );
  }

  upload(e) {
    this.banner = e[0];
  }
}
