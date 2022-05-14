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
  filtreId = null;

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

  async getFavoriteEvents() {
    this.events = await lastValueFrom(this.eventService.getFavoriteEvents());
  }

  async reset() {
    await this.getPastEvents();
    this.filtreId = null;
  }

  async filtre(e: any) {
    this.filtreId = e.target.value;
    if (this.filtreId === 1) {
      await this.getInvitedEvents();
    } else if (this.filtreId === 0) {
      await this.getAcceptedEvents();
    } else {
      await this.getFavoriteEvents();
    }

    this.events = this.events.filter(
      (e) => new Date(e.startDate) <= new Date()
    );
  }
}
