import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EventService } from '../../services/event-services/event.service';
import { EventType } from '../../services/event-services/event-type';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.css'],
})
export class PastEventsComponent implements OnInit {
  events: EventType[] = [];
  isLoading = true;
  search: string = '';

  constructor(private eventService: EventService) {}

  async ngOnInit() {
    await this.getPastEvents();
    this.isLoading = false;
  }

  async getPastEvents() {
    try {
      this.events = await lastValueFrom(this.eventService.getPastEvents());
    } catch (err) {
      console.log(err);
    }
  }

  async fireSearch() {
    this.events = await lastValueFrom(this.eventService.search(this.search));
    this.events = this.events.filter((e) => new Date(e.endDate) <= new Date());
  }

  async getInvitedEvents() {
    this.events = await lastValueFrom(this.eventService.getInvitedEvents());
  }

  async getAcceptedEvents() {
    this.events = await lastValueFrom(this.eventService.getAcceptedEvents());
  }

  async reset() {
    await this.getPastEvents();
  }

  async filtre(e: any) {
    if (e.target.value) {
      await this.getInvitedEvents();
    } else {
      await this.getAcceptedEvents();
    }
  }
}
