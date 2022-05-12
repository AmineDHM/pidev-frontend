import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EventService } from '../../services/event-services/event.service';

@Component({
  selector: 'app-redeem-pass',
  templateUrl: './redeem-pass.component.html',
  styleUrls: ['./redeem-pass.component.css'],
})
export class RedeemPassComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  passId: string | null = this.route.snapshot.paramMap.get('passId');

  async ngOnInit() {
    await this.redeem();
    this.router.navigate(['/']);
  }

  async redeem() {
    try {
      const res = await lastValueFrom(
        this.eventService.redeemPass(this.passId || '')
      );
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Great',
          text: res.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong',
      });
    }
  }
}
