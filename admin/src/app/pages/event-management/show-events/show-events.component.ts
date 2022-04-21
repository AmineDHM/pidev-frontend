import { YesNoComponent } from './../yes-no/yes-no.component';
import { EventType } from "./../../../services/event-services/event-type";
import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { EventService } from "../../../services/event-services/event.service";
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: "ngx-show-events",
  templateUrl: "./show-events.component.html",
  styleUrls: ["./show-events.component.scss"],
})
export class ShowEventsComponent implements OnInit {
  events: EventType[] = [];

  constructor(private eventService: EventService, private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((events: EventType[]) => {
      this.events = events;
      this.events.forEach((e) => {
        e.banner = `<img width="100px" src="https://firebasestorage.googleapis.com/v0/b/pidev-405b8.appspot.com/o/${e.banner}?alt=media">`;
      });
      this.source.load(this.events);
    });
  }

  settings = {
    hideSubHeader: true,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      name: {
        title: "Event Name",
        type: "string",
      },
      startDate: {
        title: "Start Date",
        type: "html",
      },
      endDate: {
        title: "End Date",
        type: "date",
      },
      venue: {
        title: "Venue",
        type: "string",
      },
      fees: {
        title: "Fees",
        type: "number",
      },
      banner: {
        title: "Banner",
        type: "html",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  onDeleteConfirm(event): void {
    this.dialogService.open(YesNoComponent)
      .onClose.subscribe(confirmed => {
        if(confirmed) {
          this.eventService.deleteEvent(event.data)
            .subscribe(
              () => event.confirm.resolve(),
              (err) => console.log("failed ", err)
            )
        }
      });

    /* if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    } */
  }
}
