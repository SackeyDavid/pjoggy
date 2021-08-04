import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RsvpService } from 'src/app/services/rsvp/rsvp.service';
import moment from 'moment';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rsvp-user',
  templateUrl: './rsvp-user.component.html',
  styleUrls: ['./rsvp-user.component.scss']
})
export class RsvpUserComponent implements OnInit {

  currentUser: any;

  isLoading: boolean;
  isSending: boolean;
  saved: boolean;
  errorMsgs: any;
  form: FormGroup = new FormGroup({});
  formBuilder: any;

  rsvpData: any;

  eventData: any;
  selectedTicket = 0;
  selectedTicketCurrency = '';
  selectedTicketPrice: number = 0;
  ticketQuantity: number = 1;
  selectTicketName = '';

  isPrefixIncluded: boolean = false;
  isFirstNameIncluded: boolean = false;
  isLastNameIncluded: boolean = false;
  isGenderIncluded: boolean = false;
  isEmailIncluded: boolean = false;
  isPhoneIncluded: boolean = false;
  isAddressIncluded: boolean = false;

  submittedContactInfo: boolean = false;
  rsvpCompleted: boolean = false;

  // for payment 
  isCardSending: boolean;
  isMobileSending: boolean;
  isCardSaved: boolean;
  isMobileSaved: boolean;
  CardErrorMsgs: any;
  MobileErrorMsgs: any;
  cardForm: FormGroup = new FormGroup({});
  mobileForm: FormGroup = new FormGroup({});

  r_switch: any;

  
  rsvpTicket: any;


  constructor(private rsvpService: RsvpService, private rsvp: RsvpService, private router: Router, 
    private userAccountsService: UserAccountService,
    private _snackBar: MatSnackBar,) {
    this.isLoading = false;
    this.isCardSending = false;
    this.isMobileSending = false;
    this.isCardSaved = false;
    this.isMobileSaved = false;
    this.isSending = false;
    this.saved = false;
  }

  ngOnInit(): void {
    this.getUser();
    this.getRsvpForm();
    this.getEventData();

    this.getEventData();


    this.rsvpTicket = sessionStorage.getItem('rsvp_ticket');

  }

  initForm(): void {
    var code, number;
    if(this.currentUser.phone){
      code = this.currentUser.phone.substring(0,3);
      number = this.currentUser.phone.substring(3);
      console.log(code);
      console.log(number);
    }
    else {
      code = '';
      number = '';
    }

    this.form = new FormGroup({
      prefix: new FormControl(''),
      firstname: new FormControl(this.currentUser?.firstname, Validators.required),
      lastname: new FormControl(this.currentUser?.lastname, Validators.required),
      phone: new FormControl(number, [Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      gender: new FormControl(this.currentUser?.gender),
      email: new FormControl(this.currentUser?.email, Validators.required),
      address: new FormControl(''),
    })
  }

  public get f(): any {
    return this.form.controls;
  }

  selectTicket(ticketId: any, currency: any, price: any, name: string){
    this.selectedTicket = ticketId;
    this.selectedTicketCurrency = currency;
    this.selectedTicketPrice = price;
    this.selectTicketName = name;
  }

  getFormData(): any {
    var details = {};

    if(this.isPrefixIncluded == true) Object.assign(details, {field_name: "Prefix", value: this.f.prefix.value});
    if(this.isFirstNameIncluded == true) Object.assign(details, {field_name: "First Name", value: this.f.firstname.value});
    if(this.isLastNameIncluded == true) Object.assign(details, {field_name: "Last Name", value: this.f.lastname.value});
    if(this.isGenderIncluded == true) Object.assign(details, {field_name: "Gender", value: this.f.gender.value});
    if(this.isEmailIncluded == true) Object.assign(details, {field_name: "Email", value: this.f.email.value});
    if(this.isPhoneIncluded == true) Object.assign(details, {field_name: "Phone No.", value: this.f.phone.value});
    if(this.isAddressIncluded == true) Object.assign(details, {field_name: "Adress", value: this.f.address.value});

    var data = {
      details: details,
      event_id: sessionStorage.getItem('preview_event_id'),
      user_id: sessionStorage.getItem('user_id'),
      ticket_id: this.selectedTicket,
      paid: this.eventData?.event[0].ticketing,
      quantity: this.ticketQuantity,
      price: this.selectedTicketPrice,
      currency: this.selectedTicketCurrency,
    }

    return data;
  }

  getEventData(){
    this.rsvpService.getCreatedEvent().then(
      res => {
        console.log(res);
        this.eventData = res;
        sessionStorage.setItem('created_event', JSON.stringify(res));

        // initialize selected ticket to the first ticket
        this.selectTicket(this.eventData?.tickets[0].id, this.eventData?.tickets[0].currency, this.eventData?.tickets[0].price, this.eventData?.tickets[0].name);
    
      },
      err => {
        console.log(err);
      }
    );
  }

  getRsvpForm(){
    this.rsvpService.getRsvp().then(
      res => {
        console.log(res);
        this.rsvpData = res[0].form_fields;

        this.rsvpData.forEach((data: any) => {
          if(data.field_name == "Prefix"){
            this.isPrefixIncluded = true;
            if(data.required){
              this.f.prefix?.setValidators(Validators.required);
              this.f.prefix?.updateValueAndValidity();
            }
          }
          if(data.field_name == "First Name"){
            console.log('first name is here')
            this.isFirstNameIncluded = true;
            if(data.required){
              this.f.firstname?.setValidators(Validators.required);
              this.f.firstname?.updateValueAndValidity();
            }
          }
          if(data.field_name == "Last Name"){
            this.isLastNameIncluded = true;
            if(data.required){
              this.f.lastname?.setValidators(Validators.required);
              this.f.lastname?.updateValueAndValidity();
            }
          }
          if(data.field_name == "Gender"){
            this.isGenderIncluded = true;
            if(data.required){
              this.f.gender?.setValidators(Validators.required);
              this.f.gender?.updateValueAndValidity();
            }
          }
          if(data.field_name == "Email"){
            this.isEmailIncluded = true;
            if(data.required){
              this.f.email?.setValidators(Validators.required);
              this.f.email?.updateValueAndValidity();
            }
          }
          if(data.field_name == "Phone No."){
            this.isPhoneIncluded = true;
            if(data.required){
              this.f.phone?.setValidators(Validators.required);
              this.f.phone?.updateValueAndValidity();
            }
          }
          if(data.field_name == "Address"){
            this.isAddressIncluded = true;
            if(data.required){
              this.f.address?.setValidators(Validators.required);
              this.f.address?.updateValueAndValidity();
            }
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(){
    console.log(this.getFormData());
    this.saved = true;

    if (this.form.valid) {
      this.isSending = true;
      this.rsvpService.sendRsvp(this.getFormData())
        .then(
          res => {
            console.log(res);
            if(res.message == 'Ticket sales ended.') {
              this.openSnackBar('Ticket sales ended.')
            }
            this.isSending = false;
            if (this.eventData.event[0].ticketing == '1' || res.event[0].ticketing == '2'){
              sessionStorage.setItem('rsvp_ticket', JSON.stringify(this.getFormData()));
              // this.router.navigateByUrl('/rsvp/payment');
              this.submittedContactInfo = true;
            }
          },
          err => {
            console.log(err)
            this.isSending = false;
            this.errorMsgs = err.error;
          }
        );
    }
  }

  
  getEventDateWithoutTime(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  
  getEventStartDateFormatted(date: any) {
    return moment(date).format('ddd, MMM D, YYYY h:mm A');
  }

  getEventEndDateFormatted(date: any) {
    return moment(date).format('h:mm A');

  }

  initCardForm(): void {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;

    this.cardForm = new FormGroup({
      customer_email: new FormControl(this.currentUser?.email, Validators.required),
      r_switch: new FormControl('', Validators.required),
      card_holder: new FormControl(this.currentUser?.firstname + ' ' + this.currentUser?.lastname, Validators.required),
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
      subscriber_number: new FormControl(this.currentUser.phone, Validators.required),
      voucher_code: new FormControl('', [Validators.pattern(numberRegEx)]),
    })
  }

  public get h(): any {
    return this.cardForm.controls;
  }

  public get g(): any {
    return this.mobileForm.controls;
  }

  getCardFormData(): any {
    const data = {
      customer_email: this.h.customer_email.value,
      r_switch: this.h.r_switch.value,
      card_holder: this.h.card_holder.value,
      pan: this.h.pan.value,
      exp_month: this.h.exp_month.value,
      exp_year: this.h.exp_year.value,
      cvv: this.h.cvv.value,
      // currency: this.rsvpTicket.currency,
      // amount: this.rsvpTicket.price,
      currency: this.selectedTicketCurrency,
      amount: this.selectedTicketPrice*this.ticketQuantity,
    };
    return data;
  }

  getMobileFormData(): any {
    const data = {
      r_switch: this.g.r_switch.value,
      subscriber_number: this.g.subscriber_number.value,
      voucher_code: this.g.voucher_code.value,
      // amount: this.rsvpTicket.price,
      amount: this.selectedTicketPrice*this.ticketQuantity,

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
            this.rsvpCompleted = true;
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
            this.rsvpCompleted = true;
          },
          err => {
            console.log(err)
            this.isMobileSending = false;
            this.MobileErrorMsgs = err.error;
            this.rsvpCompleted = true;
          }
        );
    }
  }

  getUser(): void {
    this.userAccountsService.getCurrentUser().then(
      res => {
        console.log(res);
        this.currentUser = res;
        this.initForm();
        
        this.initCardForm();
        this.initMobileForm();

        // if (res.profile) {
        //   this.imgSrc = 'http://events369.logitall.biz/storage/profile/' + res.profile
        // }
      },
      err => {
        console.log(err);
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      duration: 3000
    });
  }



}
