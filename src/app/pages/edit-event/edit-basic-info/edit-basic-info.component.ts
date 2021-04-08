import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import { DatetimeFormatterService } from 'src/app/services/datetime-formatter/datetime-formatter.service';

@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrls: ['./edit-basic-info.component.scss']
})
export class EditBasicInfoComponent implements OnInit {

  isLoading: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});
  categoriesData: any[];
  subCategoriesData: any[];
  recurringStore: string;

  url: string = '';
  currentRoute: string = '';

  event: any = {
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
    gps: ''
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private basicInfoService: BasicInfoService,
    private dtService: DatetimeFormatterService
  ) {
    this.isLoading = false;
    this.saved = false;
    this.categoriesData = [];
    this.subCategoriesData = [];
    this.recurringStore = '0';
  }

  ngOnInit(): void {
    this.populateForm()
    this.initForm();
    this.toggleVenueView();
    this.getCategories();
    this.disableSubcategory();
    this.initEnableSubcategory();

    this.url = this.router.url
    var ind1 = this.url.indexOf('/');
    var ind2 = this.url.indexOf('/', ind1 + 1);

    this.currentRoute = this.url.substring(ind2 + 1);
  }

  save(): void {
    this.isLoading = true;
    setTimeout(() => {
      // this.router.navigateByUrl('/create_event/organisers');
    }, 3500);
  }

  public get f(): any {
    return this.form.controls;
  }


  initForm(): void {
    console.log(this.event.start_date)
    this.form = this.formBuilder.group({
      title: [this.event.title, Validators.required],
      description: [this.event.description],
      venue: [this.event.venue],
      gps: [this.event.gps],
      start_date: [this.event.start_date, Validators.required],
      end_date: [this.event.end_date, Validators.required],
      start_time: [this.event.start_time, Validators.required],
      end_time: [this.event.end_time, Validators.required],
      recurring: [this.event.recurring],
      type: [this.event.type, Validators.required],
      ticketing: [this.event.ticketing, Validators.required],
      category_id: [this.event.category, Validators.required],
      subcategory_id: [this.event.subcategory, Validators.required],
      tags: [this.event.tags],
      venue_tobe_announced: [0],
      hosting: [this.event.hosting]
    });
  }

  create(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      this.isLoading = true;
      // this.router.navigateByUrl('/create_event/more_details');
      this.basicInfoService.createBasicEvent(this.getFormData()).then(
        res => {
          if (res) {
            console.log(res);
            this.isLoading = false;
            this.getCreatedEvent(res);
            console.log(this.getFormData().recurring)
            if(this.getFormData().recurring == '1') {
              this.router.navigateByUrl('/edit_event/schedule');
            } else {
              this.router.navigateByUrl('/edit_event/more_details');
            }
            // this.router.navigateByUrl('/create_event/more_details');
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
    let f_start_date = this.f.start_date.value.year + '-' + this.f.start_date.value.month + '-' + this.f.start_date.value.day;
    let f_end_date = this.f.end_date.value.year + '-' + this.f.end_date.value.month + '-' + this.f.end_date.value.day;
    let f_start_time = this.f.start_time.value.hour + ':' + this.f.start_time.value.minute + ':' + this.f.start_time.value.second;
    let f_end_time = this.f.end_time.value.hour + ':' + this.f.end_time.value.minute + ':' + this.f.end_time.value.second;

    const data = {
      title: this.f.title.value,
      description: this.f.description.value,
      venue: this.f.venue.value,
      gps: this.f.gps.value,
      // start_date: f_start_date + ' ' + f_start_time,      
      // end_date: f_end_date + ' ' + f_end_time,
      start_date: this.dtService.formatDateTime(this.f.start_date.value, this.f.start_time.value),
      end_date: this.dtService.formatDateTime(this.f.end_date.value, this.f.end_time.value),
      recurring: this.f.recurring.value,
      type: this.f.type.value,
      category_id: this.f.category_id.value,
      subcategory_id: this.f.subcategory_id.value,
      tags: this.f.tags.value,
      venue_tobe_announced: this.recurringStore,
      hosting: this.f.hosting.value,
      ticketing: this.f.ticketing.value
    };
    return data;
  }

  setRecurring(value: any): void {
    this.form.controls['recurring'].setValue(value);
  }

  setHosting(value: any): void {
    this.form.controls['recurring'].setValue(value);
  }

  toggleVenueView(): void {
    this.form.controls['venue_tobe_announced'].valueChanges.subscribe(change => {
      console.log(change);
      if (change == true) {
        this.form.controls['venue'].disable();
        this.form.controls['gps'].disable();
        this.recurringStore = '1'
      }
      else if (change == false) {
        this.form.controls['venue'].enable();
        this.form.controls['gps'].enable();
        this.recurringStore = '0'
      }
    });
  }

  disableSubcategory(): void {
    this.form.controls['subcategory_id'].disable();
  }

  initEnableSubcategory(): void {
    this.form.controls['category_id'].valueChanges.subscribe(change => {
      console.log(change);
      if (change != '') {
        this.form.controls['subcategory_id'].enable();
        this.getSubsategories();
      }
    });
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

  getSubsategories(): void {
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

  populateForm(): void {
        
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    console.log(data)
    this.event.recurring = data.event[0].recurring;
    this.event.title = data.event[0].title
    this.event.description = data.event[0].description
    // switch (data.event[0].ticketing) {
    //   case 'Donation':
    //     this.event.ticketing = 2
    //     break;
      
    //   case 'Paid':
    //     this.event.ticketing = 1
    //     break;

    //   case 'Free':
    //     this.event.ticketing = 0
    //     break;
    
    //   default:
    //     this.event.ticketing = 0;
    // }
    this.event.ticketing = data.event[0].ticketing
    this.event.type = ((data.event[0].type === true) ? '1' : '2')
    this.event.category = ((data.event[0].Category == 'Corporate Events') ? '2' : '3')
    this.event.subcategory = ((data.event[0].sub_category == 'Seminars') ? '2' : '1')
    this.event.tags = ((data.event[0].tags != null) ? data.event[0].tags : '')
    this.event.start_date = data.event[0].start_date_time.split(' ')[0]
    
    this.event.end_date = data.event[0].end_date_time.split(' ')[0]
    this.event.start_time = data.event[0].start_date_time.split(' ')[1]
    this.event.end_time = data.event[0].end_date_time.split(' ')[1]

    this.event.venue = ((data.event[0].venue != null) ? data.event[0].venue : '')
    this.event.gps =((data.event[0].gps != null) ? data.event[0].gps : '')

    console.log(this.event)
      
  }


}
