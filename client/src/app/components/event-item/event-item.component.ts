import { EventType } from './../../services/event-services/event-type';
import { EventService } from './../../services/event-services/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css'],
})
export class EventItemComponent implements OnInit {
  eventId = Number(this.route.snapshot.paramMap.get('id'));
  isStarted = false
  _albums: Array<any> = [];
  event!: EventType;
  feedbacks: any[] = [];
  avgRating: number = 0;
  weather: any;
  isLoading = true;
  isFav = false;

  feedbackForm = this.formBuilder.group({
    rate: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    _lightboxConfig.disableScrolling = true;
  }

  ngOnInit(): void {
    //fetch event
    this.eventService.getEvent(this.eventId).subscribe({
      next: (res) => {
        this.event = res;
        this.isStarted = (new Date(res.startDate) < new Date())
        res.images.forEach((image) => {
          const src = `https://firebasestorage.googleapis.com/v0/b/pidev-405b8.appspot.com/o/${image.name}?alt=media`;
          const thumb = src;
          const album = {
            src: src,
            thumb: thumb,
          };
          this._albums.push(album);
        });
      },
      error: (err) => {
        this.isLoading = false;
        if(err.status === 404) {
          this.router.navigate(['/404']);
        }
        console.log(err.status);
      },
      complete: () => (this.isLoading = false),
    });

    //fetch weather
    this.eventService.fetchEventWeather(this.eventId).subscribe({
      next: (res) => (this.weather = res),
      error: (err) => console.log(err),
    });

    //fetch info of user about the event
    this.eventService.getUserInfoAboutEvent(this.eventId).subscribe({
      next: (res) => (this.isFav = res?.isFavorite),
      error: (err) => console.log(err),
    });

    //fetch event feedbacks
    this.fetchFeedbacksAndAvgRating();
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  toggleFav(id: any) {
    this.isFav = !this.isFav;

    this.eventService.addEventToFav(id).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  fetchFeedbacksAndAvgRating() {
    this.eventService.getFeedbacksEvent(this.eventId).subscribe({
      next: (res) => (this.feedbacks = res, console.log(res)),
      error: (err) => console.log(err),
    });

    this.eventService.getAverageRatingEvent(this.eventId).subscribe({
      next: (res) => (this.avgRating = res.average),
      error: (err) => console.log(err),
    });
  }

  onSubmitFeedback() {
    this.eventService
      .feedbackEvent(this.eventId, this.feedbackForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === true) {
            this.fetchFeedbacksAndAvgRating();
          }
        },
        error: (err) => console.log(err),
        complete: () => {
          this.feedbackForm.get('rate')?.setValue('');
          this.feedbackForm.get('content')?.setValue('');
        },
      });
  }
}
