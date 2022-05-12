import { EventType } from './../../services/event-services/event-type';
import { EventService } from './../../services/event-services/event.service';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: EventType[] = [];
  isLoading = true;
  search: string = '';

  constructor(private eventService: EventService) {}

  async ngOnInit() {
    await this.getUpcomingEvents();
    this.isLoading = false;
  }

  async getUpcomingEvents() {
    try {
      this.events = await lastValueFrom(this.eventService.getUpcomingEvents());
    } catch (err) {
      console.log(err);
    }
  }

  async fireSearch() {
    this.events = await lastValueFrom(this.eventService.search(this.search));
    this.events = this.events.filter((e) => new Date(e.startDate) >= new Date());
  }
}
