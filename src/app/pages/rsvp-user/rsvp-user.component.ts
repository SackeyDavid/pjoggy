import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RsvpService } from 'src/app/services/rsvp/rsvp.service';
import moment from 'moment';

@Component({
  selector: 'app-rsvp-user',
  templateUrl: './rsvp-user.component.html',
  styleUrls: ['./rsvp-user.component.scss']
})
export class RsvpUserComponent implements OnInit {

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
  selectedTicketPrice = '';
  ticketQuantity: number = 1;

  isPrefixIncluded: boolean = false;
  isFirstNameIncluded: boolean = false;
  isLastNameIncluded: boolean = false;
  isGenderIncluded: boolean = false;
  isEmailIncluded: boolean = false;
  isPhoneIncluded: boolean = false;
  isAddressIncluded: boolean = false;

  constructor(private rsvpService: RsvpService, private router: Router) {
    this.isLoading = false;
    this.isSending = false;
    this.saved = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.getRsvpForm();
    this.getEventData();
  }

  initForm(): void {
    this.form = new FormGroup({
      prefix: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
    })
  }

  public get f(): any {
    return this.form.controls;
  }

  selectTicket(ticketId: any, currency: any, price: any){
    this.selectedTicket = ticketId;
    this.selectedTicketCurrency = currency;
    this.selectedTicketPrice = price;
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
            this.isSending = false;
            if (this.eventData.event[0].ticketing == '1' || res.event[0].ticketing == '2'){
              sessionStorage.setItem('rsvp_ticket', JSON.stringify(this.getFormData()));
              this.router.navigateByUrl('/rsvp/payment');
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

}
