import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RsvpService } from 'src/app/services/rsvp/rsvp.service';

@Component({
  selector: 'app-rsvp-payment',
  templateUrl: './rsvp-payment.component.html',
  styleUrls: ['./rsvp-payment.component.scss']
})
export class RsvpPaymentComponent implements OnInit {

  isLoading: boolean;
  isCardSending: boolean;
  isMobileSending: boolean;
  isCardSaved: boolean;
  isMobileSaved: boolean;
  CardErrorMsgs: any;
  errorMsgs: any;
  MobileErrorMsgs: any;
  cardForm: FormGroup = new FormGroup({});
  mobileForm: FormGroup = new FormGroup({});

  eventData: any;
  // selectedTicket = 0;
  // selectedTicketCurrency = '';
  // selectedTicketPrice = '';

  rsvpTicket: any;

  constructor(private rsvp: RsvpService, private router: Router) {
    this.isLoading = false;
    this.isCardSending = false;
    this.isMobileSending = false;
    this.isCardSaved = false;
    this.isMobileSaved = false;
  }

  ngOnInit(): void {
    this.initCardForm();
    this.initMobileForm();
    this.getEventData();

    this.rsvpTicket = sessionStorage.getItem('rsvp_ticket');
  }

  // selectTicket(ticketId: any, currency: any, price: any){
  //   this.selectedTicket = ticketId;
  //   this.selectedTicketCurrency = currency;
  //   this.selectedTicketPrice = price;
  // }

  getEventData(){
    this.rsvp.getCreatedEvent().then(
      res => {
        console.log(res);
        this.eventData = res;
        sessionStorage.setItem('created_event', JSON.stringify(res));

        if (res.event[0].ticketing == '0'){
          this.router.navigateByUrl('/rsvp/user');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  initCardForm(): void {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;

    this.cardForm = new FormGroup({
      customer_email: new FormControl('', Validators.required),
      r_switch: new FormControl('', Validators.required),
      card_holder: new FormControl('', Validators.required),
      pan: new FormControl('', Validators.required),
      exp_month: new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      exp_year: new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
    })
  }

  initMobileForm(): void {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;

    this.mobileForm = new FormGroup({
      r_switch: new FormControl('', Validators.required),
      subscriber_number: new FormControl('', Validators.required),
      voucher_code: new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
    })
  }

  public get f(): any {
    return this.cardForm.controls;
  }

  public get g(): any {
    return this.mobileForm.controls;
  }

  getCardFormData(): any {
    const data = {
      customer_email: this.f.customer_email.value,
      r_switch: this.f.r_switch.value,
      card_holder: this.f.card_holder.value,
      pan: this.f.pan.value,
      exp_month: this.f.exp_month.value,
      exp_year: this.f.exp_year.value,
      cvv: this.f.cvv.value,
      currency: this.rsvpTicket.currency,
      amount: this.rsvpTicket.price,
    };
    return data;
  }

  getMobileFormData(): any {
    const data = {
      r_switch: this.g.r_switch.value,
      subscriber_number: this.g.subscriber_number.value,
      voucher_code: this.g.voucher_code.value,
      amount: this.rsvpTicket.price,
    };
    return data;
  }

  onCardSubmit(){
    console.log(this.getCardFormData());
    this.isCardSaved = true;

    if (this.cardForm.valid) {
      this.isCardSending = true;
      this.rsvp.makeCardPayment(this.getCardFormData())
        .then(
          res => {
            console.log(res);
            this.isCardSending = false;
          },
          err => {
            console.log(err)
            this.isCardSending = false;
            this.CardErrorMsgs = err.error;
          }
        );
    }
  }

  onMobileSubmit(){
    console.log(this.getMobileFormData());
    this.isMobileSaved = true;

    if (this.mobileForm.valid) {
      this.isMobileSending = true;
      this.rsvp.makeMobilePayment(this.getMobileFormData())
        .then(
          res => {
            console.log(res);
            this.isMobileSending = false;
          },
          err => {
            console.log(err)
            this.isMobileSending = false;
            this.MobileErrorMsgs = err.error;
          }
        );
    }
  }

}
