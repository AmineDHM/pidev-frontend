import { EventType } from './../../services/event-services/event-type';
import { EventService } from './../../services/event-services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  eventId = Number(this.route.snapshot.paramMap.get('id'));
  userEvent: any;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '20px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
    hidePostalCode: true,
    iconStyle: 'solid',
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };

  stripeTest = this.fb.group({
    email: new FormControl('', [Validators.required]),
    recaptcha: new FormControl('', [Validators.required]),
  });

  async ngOnInit() {
    await this.fetchUserEvent();
    console.log(this.userEvent);
    if (!this.userEvent?.isInvited || !this.userEvent) {
      this.toastrService.error("Sorry but you're not invited to this event.");
      this.router.navigate(['/']);
      return;
    }

    const event: EventType = this.userEvent.event;

    if (new Date(event.startDate) <= new Date() && this.userEvent.isAccepted) {
      this.toastrService.error(
        'Your invitation is expired, the event is already started.'
      );
      this.router.navigate(['/']);
      return;
    }

    if (this.userEvent.isAccepted) {
      this.toastrService.error('Your already accepted the invitation.');
      this.router.navigate(['/']);
      return;
    }
  }

  createToken(): void {
    const email = this.stripeTest.get('email')?.value;
    this.stripeService
      .createToken(this.card.element, email)
      .subscribe((res) => {
        if (res.token) {
          this.eventService
            .pay(this.eventId, {
              email,
              token: res.token.id,
            })
            .subscribe({
              next: (res) => {
                this.toastrService.success(
                  'Thank you for your payment, you can now download your pass in order to participate to this event!'
                );
                console.log(res);
                this.router.navigate(['events/pass/' + this.eventId]);
              },
              error: (err) => {
                this.toastrService.error(
                  err.error.message.split(';')[0],
                  'Error'
                );
                console.log(err);
              },
            });
        } else if (res.error) {
          // Error creating the token
          this.toastrService.error(res.error.message, 'Error');
        }
      });
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
}
