import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { DatetimeFormatterService } from 'src/app/services/datetime-formatter/datetime-formatter.service';

@Component({ 
  selector: 'app-create-event-schedules',
  templateUrl: './create-event-schedules.component.html',
  styleUrls: ['./create-event-schedules.component.scss']
})
export class CreateEventSchedulesComponent implements OnInit {

  isLoading: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});

  isDaily: boolean;
  isWeekly: boolean;
  isMonthly: boolean;

  eventId: string = ''
  eventTitle: string = ''
  eventDate: string = '' 
  startDate: string = ''
  endDate: string = ''

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private schedulingService: SchedulingService,
    private dtService: DatetimeFormatterService
  ) {
    this.isLoading = false;
    this.saved = false; 
    this.isDaily = true;
    this.isWeekly = false;
    this.isMonthly = false; 
  }

  ngOnInit(): void {
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventId = data.event[0].id;
    this.eventTitle = data.event[0].title;
    this.startDate = data.event[0].start_date_time;
    this.endDate = data.event[0].end_date_time;

    this.initForm();
  }

  public get f(): any {
    return this.form.controls;
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      start_date: [this.startDate],
      end_date: [this.endDate],
      recurs: ['', Validators.required],
      days: [''],
      months: [''],
    });

    this.form.controls['start_date'].disable();
    this.form.controls['end_date'].disable();
  }

  previous() {
    this.router.navigateByUrl('/create_event/basic_info');
  }

  save() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/create_event/more_details');
    }, 3500);
  }

  create(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      this.isLoading = true;
      this.schedulingService.createSchedule(this.getFormData()).then(
        res => {
          if (res) {
            console.log(res);
            this.isLoading = false;
            
            this.router.navigateByUrl('/create_event/more_details');
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
    const data = {
      event_id: this.eventId,
      recurs: this.f.recurs.value,
      occurs_every: this.f.recurs.daily,
    };
    return data;
  }

  setReccurance(){
    console.log(this.f.recurs.value);
    if (this.f.recurs.value == 0) {
      this.isDaily = true;
      this.isWeekly = false;
      this.isMonthly = false;
    }
    else if (this.f.recurs.value == 1) {
      this.isDaily = true;
      this.isWeekly = true;
      this.isMonthly = false;
    }
    else if (this.f.recurs.value == 2) {
      this.isDaily = true;
      this.isWeekly = true;
      this.isMonthly = true;
    }    
  }

}
