import _ from 'lodash';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import { DatetimeFormatterService } from 'src/app/services/datetime-formatter/datetime-formatter.service';
import { EventSideMenuCheckService } from 'src/app/services/event-side-menu-check/event-side-menu-check.service';

@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrls: ['./edit-basic-info.component.scss']
})
export class EditBasicInfoComponent implements OnInit {

  eventTitle: string = '';
  eventDate: string = '';
  eventID: string = '';
  startDateTime: string = '';
  endDateTime: string = '';

  isLoading: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});
  categoriesData: any[];
  subCategoriesData: any[];
  tagsString: string;
  tagsList: Array<any>;
  recurringStore: string;

  isDateCorrect: boolean;
  isDateIntervalCorrect: boolean;
  isTimeCorrect: boolean;
  isTimeIntervalCorrect: boolean;

  url: string = '';
  event: any;
  currentRoute: string = '';

  formattedAddress = '';
  addressCoordinates = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private basicInfoService: BasicInfoService,
    private dtService: DatetimeFormatterService,
    private checkSessionData: EventSideMenuCheckService
  ) {
    this.isLoading = false;
    this.saved = false;
    this.categoriesData = [];
    this.subCategoriesData = [];
    this.tagsString = '';
    this.tagsList = [];
    this.recurringStore = '0';

    this.isDateCorrect = true;
    this.isDateIntervalCorrect = true;
    this.isTimeCorrect = true;
    this.isTimeIntervalCorrect = true;

    this.initVars();
  }

  ngOnInit(): void {
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventTitle = data.event[0].title;
    this.eventDate = data.event[0].start_date_time;
    this.startDateTime = data.event[0].start_date_time;
    this.endDateTime = data.event[0].end_date_time;
    this.eventID = data.event[0].id;


    this.populateForm()
    this.initForm();
    this.populateSubCategory()
    // this.toggleVenueView();
    this.getCategories();
    this.disableSubcategory();

    this.url = this.router.url
    var ind1 = this.url.indexOf('/');
    var ind2 = this.url.indexOf('/', ind1 + 1);

    this.currentRoute = this.url.substring(ind2 + 1);

    this.setRecurring(data.event[0].recurring)
    this.setHosting(data.event[0].hosting)


  }

  initVars() {
    this.event = {
      title: '',
      description: '',
      ticketing: '',
      type: '',
      category: '',
      subcategory: '',
      tags: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      venue: '',
      gps: '',
      recurring: '',
      hosting: ''
    };
  }

  public get f(): any {
    return this.form.controls;
  }


  initForm(): void {
    console.log(this.startDateTime)
    this.form = this.formBuilder.group({
      title: [this.event.title, Validators.required],
      description: [this.event.description, [Validators.required, Validators.maxLength(250)]],
      venue: [this.event.venue],
      gps: [this.event.gps],
      start_date: [this.event.start_date, Validators.required],
      end_date: [this.event.end_date, Validators.required],
      // start_time: [new Date('2020-05-23 16:25:40'), Validators.required],
      start_time: [new Date(this.startDateTime), Validators.required],
      end_time: [new Date(this.endDateTime), Validators.required],
      recurring: [this.event.recurring],
      type: [this.event.type, Validators.required],
      ticketing: [this.event.ticketing, Validators.required],
      category_id: [this.event.category, Validators.required],
      subcategory_id: [this.event.subcategory, Validators.required],
      tags: '',
      // venue_tobe_announced: [0],
      hosting: [this.event.hosting]
    });

    this.formattedAddress = this.event.venue;
    this.addressCoordinates = this.event.gps;

    this.setHostingValidators();
    this.setTagsChips();
  }

  dateValidation(){
    let date = new Date();
    date.setHours(0,0,0,0);
    let today = date.valueOf();
    let sd = Date.parse(this.f.start_date.value);
    let ed = Date.parse(this.f.end_date.value);
    let now = new Date().getTime();
    let st = new Date(this.f.start_time.value).getTime();
    let et = new Date(this.f.end_time.value).getTime();

    console.log(Date.parse(this.f.start_date.value));
    console.log(Date.parse(this.f.end_date.value));
    console.log(today);

    // check if event date is greater than today's date
    // TODO: this check aint working
    if (sd >= today) this.isDateCorrect = true;
    else this.isDateCorrect = false;

    // check if end date is greater start date
    if (ed >= sd) this.isDateIntervalCorrect = true;
    else this.isDateIntervalCorrect = false;

    // if date is same check time
    if (ed == sd){
      // check if event date is today and
      // check if event time is greater than current time
      if (sd == today) {
        if (st > now) this.isTimeCorrect = true;
        else this.isTimeCorrect = false;
      }

      // check if end date is greater start date
      if (et > st) this.isTimeIntervalCorrect = true;
      else this.isTimeIntervalCorrect = false;
    }
  }

  edit(): void {
    console.log(this.formattedAddress)
    this.saved = true;
    this.dateValidation();
    if (this.form.valid && this.isDateCorrect && this.isDateIntervalCorrect && this.isTimeCorrect && this.isTimeIntervalCorrect) {
      console.log(this.getFormData());
      this.isLoading = true;
      this.basicInfoService.editBasicEvent(this.eventID, this.getFormData()).then(
        res => {
          if (res) {
            console.log(res);
            this.isLoading = false;
            this.getCreatedEvent(this.eventID);
            // console.log(this.getFormData());

            if (this.getFormData().recurring == '1') {
              if (this.checkSessionData.eventHasScheduleData()) {
                this.router.navigateByUrl('/edit_event/schedule');
              }
              else {
                this.router.navigateByUrl('/create_event/schedule');
              }
            }
            else {
              if (this.checkSessionData.eventHasMoreDetailsData()) {
                this.router.navigateByUrl('/edit_event/more_details');
              }
              else {
                this.router.navigateByUrl('/create_event/more_details');
              }
            }
          }
          else {
            this.isLoading = false;
            alert('didnt create');
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
  }

  getFormData(): any {
    console.log(this.formattedAddress)
    const data = {
      title: this.f.title.value,
      description: this.f.description.value,
      venue: this.formattedAddress,
      gps: this.addressCoordinates,
      start_date: this.dtService.formatDateTime(this.f.start_date.value, this.f.start_time.value),
      end_date: this.dtService.formatDateTime(this.f.end_date.value, this.f.end_time.value),
      recurring: this.event.recurring,
      type: this.f.type.value,
      category_id: this.f.category_id.value,
      subcategory_id: this.f.subcategory_id.value,
      tags: this.tagsString,
      // venue_tobe_announced: this.recurringStore,
      hosting: this.event.hosting,
      ticketing: this.f.ticketing.value
    };
    return data;
  }

  setRecurring(value: any): void {
    this.form.controls['recurring'].setValue(value);

    this.event.recurring = this.form.controls['recurring'].value;
    if(this.event.recurring == '0') {
      var tab_active = document.getElementById('pills-onetime');
      if (tab_active) tab_active.className = "tab-pane fade active show";

      var tab_inactive =  document.getElementById('pills-recurring');
      if (tab_inactive) tab_inactive.className = "tab-pane fade";
    }
    else {
      var tab_active = document.getElementById('pills-recurring');
      if (tab_active) tab_active.className = "tab-pane fade active show";

      var tab_inactive =  document.getElementById('pills-onetime');
      if (tab_inactive) tab_inactive.className = "tab-pane fade";
    }
  }

  setHosting(value: any): void {
    this.form.controls['hosting'].setValue(value);
    this.event.hosting = this.form.controls['hosting'].value

    if(this.event.hosting == '1') {
      var tab_active = document.getElementById('pills-home');
      if (tab_active) tab_active.className = "tab-pane fade active show";

      var tab_inactive =  document.getElementById('pills-profile');
      if (tab_inactive) tab_inactive.className = "tab-pane fade";
    } else {
      var tab_active = document.getElementById('pills-profile');
      if (tab_active) tab_active.className = "tab-pane fade active show";

      var tab_inactive =  document.getElementById('pills-home');
      if (tab_inactive) tab_inactive.className = "tab-pane fade";
    }

    this.setHostingValidators();
  }

  setHostingValidators() {
    if (this.f.hosting.value == '1') {
      console.log('...adding physical event validators');
      this.f.venue.setValidators(Validators.required);
      // this.f.gps.setValidators(Validators.required);
      this.f.venue.updateValueAndValidity();
      // this.f.gps.updateValueAndValidity();
    }
    else if (this.f.hosting.value == '0') {
      console.log('...removing physical event validators');
      this.f.venue.clearValidators();
      // this.f.gps.clearValidators();
      this.f.venue.updateValueAndValidity();
      // this.f.gps.updateValueAndValidity();
    }
  }

  // toggleVenueView(): void {
  //   this.form.controls['venue_tobe_announced'].valueChanges.subscribe(change => {
  //     console.log(change);
  //     if (change == true) {
  //       this.form.controls['venue'].disable();
  //       this.form.controls['gps'].disable();
  //       this.recurringStore = '1'
  //     }
  //     else if (change == false) {
  //       this.form.controls['venue'].enable();
  //       this.form.controls['gps'].enable();
  //       this.recurringStore = '0'
  //     }
  //   });
  // }

  disableSubcategory(): void {
    this.form.controls['subcategory_id'].disable();
  }

  populateSubCategory(): void {
    // this.form.controls['category_id'].valueChanges.subscribe(change => {
    //   console.log(change);
    //   if (change != '') {
      this.form.controls['subcategory_id'].enable();
      this.getSubcategories();
      // }
    // });
  }

  enableSubcategory(): void {
    this.f.subcategory_id.enable();
  }

  getCategories(): void {
    this.basicInfoService.getCategories().then(
      res => {
        console.log(res);
        this.categoriesData = res.categories;
      },
      err => {
        console.log(err);
      }
    );
  }

  getSubcategories(): void {
    this.enableSubcategory();
    this.basicInfoService.getSubcategories(this.f.category_id.value).then(
      res => {
        console.log(res);
        this.subCategoriesData = res.sub_categories;
      },
      err => {
        console.log(err);
      }
    );
  }

  getCreatedEvent(eventId: any): void {
    this.basicInfoService.getCreatedEvent(eventId).then(
      res => {
        console.log(res);
        sessionStorage.setItem('created_event', JSON.stringify(res));
      },
      err => {
        console.log(err);
      }
    );
  }

  setTagsChips() {
    let chips: any[] = this.event.tags.split(',');
    for (var i = 0; i < chips.length; i++) {
      if (chips[i] != '')this.tagsList.unshift(chips[i]);
    }

    this.tagsString = this.event.tags;
  }

  populateForm(): void {
    var data: any =  sessionStorage.getItem('created_event');
    data = JSON.parse(data);
    console.log(data);
    this.event.recurring = data.event[0].recurring;
    this.event.title = data.event[0].title;
    this.event.description = data.event[0].description;
    this.event.ticketing = data.event[0].ticketing;
    this.event.type = ((data.event[0].type === true) ? '0' : '1');
    this.event.category = data.event[0].Category_id;
    this.event.subcategory = data.event[0].subcategory_id;
    this.event.tags = ((data.event[0].tags != null) ? data.event[0].tags : '');

    this.event.start_date = data.event[0].start_date_time.split(' ')[0];
    this.event.end_date = data.event[0].end_date_time.split(' ')[0];

    this.event.start_time = data.event[0].start_date_time.split(' ')[1];
    this.event.end_time = data.event[0].end_date_time.split(' ')[1];

    this.event.venue = ((data.event[0].venue != null) ? data.event[0].venue : '');
    this.event.gps = ((data.event[0].gps != null) ? data.event[0].gps : '');
    this.event.hosting = data.event[0].hosting;

    console.log(this.event);
  }

  addChip(){
    this.tagsList.unshift(this.f.tags.value);

    let input = this.f.tags.value + ',';
    this.tagsString = this.tagsString + input;
    console.log(this.tagsString);

    this.f.tags.setValue('');
  }

  deleteChip(index: any){
    console.log(index);
    this.tagsList.splice(index, 1);
    let delArray = this.tagsString.split(',')
    let delString = delArray[index - 1];
    delString = delString + ',';
    this.tagsString = this.tagsString.replace(delString, '');
    console.log(this.tagsString);
  }

  public handleAddressChange(address: any) {
    console.log(address);
    this.formattedAddress = address.formatted_address;
    this.addressCoordinates = address.geometry.location.lat() + ', ' + address.geometry.location.lng();
    this.f.gps.setValue(this.addressCoordinates);
  }

  openUsersEvents() {
    console.log(this.formattedAddress)
    this.saved = true;
    this.dateValidation();
    if (this.form.valid && this.isDateCorrect && this.isDateIntervalCorrect && this.isTimeCorrect && this.isTimeIntervalCorrect) {
      console.log(this.getFormData());
      this.isLoading = true;
      this.basicInfoService.editBasicEvent(this.eventID, this.getFormData()).then(
        res => {
          if (res) {
            console.log(res);
            this.isLoading = false;
            this.getCreatedEvent(this.eventID);
            // console.log(this.getFormData());

            if (this.getFormData().recurring == '1') {
              if (this.checkSessionData.eventHasScheduleData()) {
                this.router.navigateByUrl('/user_events');
              }
              else {
                this.router.navigateByUrl('/user_events');
              }
            }
            else {
              if (this.checkSessionData.eventHasMoreDetailsData()) {
                this.router.navigateByUrl('/user_events');
              }
              else {
                this.router.navigateByUrl('/user_events');
              }
            }
          }
          else {
            this.isLoading = false;
            alert('didnt create');
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
  }

}
