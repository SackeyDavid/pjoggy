import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RsvpService } from 'src/app/services/rsvp/rsvp.service';
import moment from 'moment';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-rsvp-user',
  templateUrl: './rsvp-user.component.html',
  styleUrls: ['./rsvp-user.component.scss']
})
export class RsvpUserComponent implements OnInit, AfterViewInit {

  currentUser: any;
  eventHost: any;
  eventHostImgSrc: any;

  eventCreatorsEvents: any = [];

  isLoading: boolean;
  isSending: boolean;
  saved: boolean;
  errorMsgs: any;
  form: FormGroup = new FormGroup({});
  formBuilder: any;

  rsvpData: any;

  eventData: any;
  selectedTicket = 0;
  selectedIndex = 0;
  selectedTicketCurrency = '';
  selectedTicketPrice: number = 0;
  ticketQuantity: any[] = [];
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

  transactionId: any;

  r_switch: any;


  rsvpTicket: any;


  constructor(private rsvpService: RsvpService, private rsvp: RsvpService, private router: Router, 
    private userAccountsService: UserAccountService, 
    private eventsService: EventsService, 
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

  ngAfterViewInit() {
    
    this.getUser();
    this.getRsvpForm();
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

    if(this.currentUser) {
      this.form = new FormGroup({
        prefix: new FormControl(''),
        firstname: new FormControl(this.currentUser?.firstname, Validators.required),
        lastname: new FormControl(this.currentUser?.lastname, Validators.required),
        phone: new FormControl(number, [Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
        gender: new FormControl(this.currentUser?.gender),
        email: new FormControl(this.currentUser?.email, Validators.required),
        address: new FormControl(''),
      });
    } else {
      this.form = new FormGroup({
        prefix: new FormControl(''),
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
        gender: new FormControl(''),
        email: new FormControl('', Validators.required),
        address: new FormControl(''),
      });
    }
  }

  public get f(): any {
    return this.form.controls;
  }

  selectTicket(index: any, ticketId: any, currency: any, price: any, name: string){
    this.selectedIndex = index;
    this.selectedTicket = ticketId;
    this.selectedTicketCurrency = currency;
    if(this.selectedTicketPrice == 0) this.selectedTicketPrice = price;
    this.selectTicketName = name;

    // if the ticket quantity was previouly 0 because it was deselected, set it to 1 on select
    if(this.ticketQuantity[index] <= 0) this.ticketQuantity[index] = 1;

    // set ticket quantity if quantity not set
    if(!this.ticketQuantity[index]) this.ticketQuantity[index] = 1;

    // set all other tickets to 0 when a particular ticket is selected
    for(var i=0; i<this.ticketQuantity.length; i++){
      if(i !== this.selectedIndex) this.ticketQuantity[i] = 0;
      
      // if(i == this.selectedIndex) this.ticketQuantity[i] = 1;

    }
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
      quantity: this.ticketQuantity[this.selectedIndex],
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
        this.selectTicket(this.selectedIndex, this.eventData?.tickets[0].id, this.eventData?.tickets[0].currency, this.eventData?.tickets[0].price, this.eventData?.tickets[0].name);
        
        // initialize first ticket quantity to 1
        this.ticketQuantity[0] = 1;

        // get event creators events count
        this.getAllEventCreatorsEvents();
        this.getEventHost();
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
      console.log('reached send rsvp code');
      this.rsvpService.sendRsvp(this.getFormData())
        .then(
          res => {
            console.log(res);
            if(res.message == 'Ticket sales ended.') {
              this.isSending = false;
              return this.openSnackBar('Oops, ticket sales ended.');
              
            }
            if(res.message == 'Ticket sold out.') {
              this.isSending = false;
              return this.openSnackBar('Oops, tickets sold out.'); 
              
            }

            this.isSending = false;
            sessionStorage.setItem('rsvp_ticket', JSON.stringify(this.getFormData()));
            
            if (this.eventData?.event[0].ticketing == '1' || this.eventData?.event[0].ticketing == '2'){
              // this.router.navigateByUrl('/rsvp/payment');
              this.submittedContactInfo = true;
            } 
            if (this.eventData?.event[0].ticketing == '0') {
              this.rsvpCompleted = true;
            }

          },
          err => {
            console.log(err)
            this.isSending = false;
            this.errorMsgs = err.error;
          }
        );
    } else {
      console.log('rsvp form invalid');
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
      customer_email: new FormControl('warihanagumah@gmail.com', Validators.required),
      r_switch: new FormControl('MAS', Validators.required),
      card_holder: new FormControl('VBV Enabled', Validators.required),
      pan: new FormControl('4111111111111111', Validators.required),
      exp_month: new FormControl('12', [Validators.required, Validators.pattern(numberRegEx)]),
      exp_year: new FormControl('12', [Validators.required, Validators.pattern(numberRegEx)]),
      cvv: new FormControl('123', [Validators.required, Validators.pattern(numberRegEx)]),
    })
  }

  initMobileForm(): void {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;

    this.mobileForm = new FormGroup({
      r_switch: new FormControl('MTN', Validators.required),
      subscriber_number: new FormControl('233501879144', Validators.required),
      voucher_code: new FormControl('2152', [Validators.pattern(numberRegEx)]),
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
      // currency: this.selectedTicketCurrency,
      currency: 'GHS',
      // amount: (this.selectedTicketPrice*this.ticketQuantity[this.selectedIndex]).toFixed(2),
      amount: 10,
    };
    return data;
  }

  getMobileFormData(): any {
    const data = {
      r_switch: this.g.r_switch.value,
      subscriber_number: this.g.subscriber_number.value,
      voucher_code: this.g.voucher_code.value,
      // amount: this.rsvpTicket.price,
      // amount: (this.selectedTicketPrice*this.ticketQuantity[this.selectedIndex]).toFixed(2),
      amount: 1,

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
            // get rsvpTicket data
            this.rsvpTicket = sessionStorage.getItem('rsvp_ticket');
            this.rsvpTicket = JSON.parse(this.rsvpTicket);
            // console.log(this.rsvpTicket)

            this.rsvpCompleted = true;
            this.transactionId = res.message.transaction_id;


            
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
            if(res.message.status == 'approved') {
              // get rsvpTicket data
              this.rsvpTicket = sessionStorage.getItem('rsvp_ticket');
              this.rsvpTicket = JSON.parse(this.rsvpTicket);

              this.rsvpCompleted = true;
            } else {
              // payment only works with data from docs
              this.openSnackBar('Oops, an error occurred');
            }
            this.transactionId = res.transaction_id;
          },
          err => {
            console.log(err)
            this.isMobileSending = false;
            this.MobileErrorMsgs = err.error;
            this.rsvpCompleted = false;
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

  getEventHost(): void {
    this.userAccountsService.getAnyUser(this.eventData?.event[0].user_id).then(
      res => {
        console.log(res);
        this.eventHost = res;
        

        if (res.user.profile) {
          this.eventHostImgSrc = 'http://events369.logitall.biz/storage/profile/' + res.user.profile;
        }
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

  getAllEventCreatorsEvents(): void {
    this.eventsService.getAllEventCreatorsEvents(this.eventData?.event[0].user_id).then(
      res => {
        console.log(res);
        this.eventCreatorsEvents = res.all_events;
        this.eventCreatorsEvents.data.sort(function(a: any, b:any){
          return new Date(b.start_date_time).valueOf() - new Date(a.start_date_time).valueOf();
        });
      },
      err => {
        console.log(err);
      }
    );
  }



}
