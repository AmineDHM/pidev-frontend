import { messages } from './../../../../../admin/src/app/pages/extra-components/chat/messages';
import { EventType } from './../../services/event-services/event-type';
import { EventService } from './../../services/event-services/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image-services/image.service';
import { lastValueFrom } from 'rxjs';
import { HttpHeaderResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css'],
})
export class EventItemComponent implements OnInit {
  eventId = Number(this.route.snapshot.paramMap.get('id'));
  isStarted = false;
  _albums: Array<any> = [];
  event!: EventType;
  feedbacks: any[] = [];
  avgRating: number = 0;
  weather: any;
  isLoading = true;
  isFav = false;
  isInvited = false;
  isParticipated = false;

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
    private router: Router,
    private imageService: ImageService,
    private toastrService: ToastrService
  ) {
    _lightboxConfig.disableScrolling = true;
  }

  async ngOnInit() {
    await this.fetchEvent();
    await this.fetchWeather();
    await this.fetchAvgRating();
    await this.fetchFeedbacks();
    await this.fetchUserEventInfo();

    console.log(this.feedbacks);

    this.isLoading = false;
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  async toggleFav(id: any) {
    this.isFav = !this.isFav;
    try {
      await lastValueFrom(this.eventService.addEventToFav(id));
    } catch (err) {
      console.log(err);
    }
  }

  async fetchFeedbacks() {
    try {
      this.feedbacks = await lastValueFrom(
        this.eventService.getFeedbacksEvent(this.eventId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async fetchAvgRating() {
    try {
      const res = await lastValueFrom(
        this.eventService.getAverageRatingEvent(this.eventId)
      );
      this.avgRating = res.average;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchWeather() {
    try {
      this.weather = await lastValueFrom(
        this.eventService.fetchEventWeather(this.eventId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async fetchUserEventInfo() {
    try {
      const res = await lastValueFrom(
        this.eventService.getUserInfoAboutEvent(this.eventId)
      );
      this.isFav = res.isFavorite;
      this.isInvited = res.isInvited;
      this.isParticipated = res.isAccepted;
    } catch (err) {
      console.log(err);
    }
  }

  onSubmitFeedback() {
    this.eventService
      .feedbackEvent(this.eventId, this.feedbackForm.value)
      .subscribe({
        next: async (res) => {
          if (res.status === true) {
            await this.fetchFeedbacks();
            await this.fetchAvgRating();
            this.toastrService.success(res.message, 'Success');
          } else {
            this.toastrService.error(res.message, 'Error');
          }
        },
        error: (err) => {
          this.toastrService.error('Something went wrong', 'Error');
          console.log(err);
        },
        complete: () => {
          this.feedbackForm.reset();
        },
      });
  }

  async getImageDescription(url: string) {
    try {
      const res = await lastValueFrom(this.imageService.describeImage(url));
      return res?.description?.captions?.[0]?.text;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchEvent() {
    try {
      this.event = await lastValueFrom(
        this.eventService.getEvent(this.eventId)
      );
      this.isStarted = new Date(this.event.startDate) < new Date();
      this.event.images.forEach(async (image) => {
        const src = `https://firebasestorage.googleapis.com/v0/b/pidev-405b8.appspot.com/o/${image.name}?alt=media`;
        const thumb = src;
        const description = await this.getImageDescription(src);
        const caption = 'This image may contain ' + description;
        const album = {
          src,
          thumb,
          caption,
        };
        this._albums.push(album);
      });
    } catch (err: any) {
      if (err.status === 404) {
        this.router.navigate(['/404']);
      }
    }
  }
}
