import { EventService } from './../../services/event-services/event.service';
import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventType } from './../../services/event-services/event-type';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css'],
})
export class PassComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  eventId = Number(this.route.snapshot.paramMap.get('id'));
  userEvent: any;
  passQr: any;
  loading = true;

  async ngOnInit() {
    await this.fetchUserEvent();
    console.log(this.userEvent);
    if (!this.userEvent?.isInvited || !this.userEvent) {
      this.toastrService.error("Sorry but you're not invited to this event.");
      this.router.navigate(['/']);
      return;
    }

    await this.getPassQr();
    this.loading = false;
  }

  async fetchUserEvent() {
    try {
      this.userEvent = await lastValueFrom(
        this.eventService.getUserInfoAboutEvent(this.eventId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async getPassQr() {
    try {
      const res = await lastValueFrom(this.eventService.getPass(this.eventId));
      this.passQr = res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
