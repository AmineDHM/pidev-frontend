import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  payForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    exp_month: new FormControl('', [Validators.required]),
    exp_year: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}
}
