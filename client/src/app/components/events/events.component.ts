import { EventType } from './../../services/event-services/event-type';
import { EventService } from './../../services/event-services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: EventType[] = [];
  isLoading = true;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res) => (this.events = res),
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
      complete: () => (this.isLoading = false),
    });
  }
}