import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import { DatetimeFormatterService } from 'src/app/services/datetime-formatter/datetime-formatter.service';


@Component({
  selector: 'app-create-basic-info',
  templateUrl: './create-basic-info.component.html',
  styleUrls: ['./create-basic-info.component.scss']
})
export class CreateBasicInfoComponent implements OnInit {

  isLoading: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});
  categoriesData: any[];
  subCategoriesData: any[];
  tagsString: string;
  tagsList: Array<any>;
  recurringStore: string;

  hosting: any = 1

  url: string = '';
  currentRoute: string = '';

  formattedAddress = '';

  // options = {
  //   componentRestrictions: {
  //     country: ['GH']
  //   }
  // }

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
    this.tagsString = '';
    this.tagsList = [];
    this.recurringStore = '0';
  }

  ngOnInit(): void {
    this.initForm();
    this.toggleVenueView();
    this.getCategories();
    this.disableSubcategory();
  }

  public get f(): any {
    return this.form.controls;
  }


  initForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      venue: [''],
      gps: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      recurring: ['0'],
      type: ['', Validators.required],
      ticketing: ['', Validators.required],
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      tags: [''],
      venue_tobe_announced: [0],
      hosting: [this.hosting]
    });

    this.setHostingValidators();
  }  

  create(): void {
    this.saved = true;
    if (this.form.valid) {
      this.isLoading = true;
      const data = this.getFormData();
      console.log(data);
      this.basicInfoService.createBasicEvent(data).then(
        res => {
          if (res) {
            console.log(res);
            console.log(data.recurring);
            this.saveCreatedEvent(res).then(
              ok => {
                if (ok) {
                  this.isLoading = false;
                  data.recurring == '1'
                    ? this.router.navigateByUrl('/create_event/schedule')
                    : this.router.navigateByUrl('/create_event/more_details');
                }
              },
              err => {
                // we still navigate but will get the data from the side menu.
                data.recurring == '1'
                  ? this.router.navigateByUrl('/create_event/schedule')
                  : this.router.navigateByUrl('/create_event/more_details');
              }
            );
          }
          else {
            this.isLoading = false;
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
    else{
      console.log('scrolling to top');
      window.scrollTo(0,0);
    }
  }

  getFormData(): any {
    const data = {
      title: this.f.title.value,
      description: this.f.description.value,
      venue: this.f.venue.value,
      gps: this.f.gps.value,
      start_date: this.dtService.formatDateTime(this.f.start_date.value, this.f.start_time.value),
      end_date: this.dtService.formatDateTime(this.f.end_date.value, this.f.end_time.value),
      recurring: this.f.recurring.value,
      type: this.f.type.value,
      category_id: this.f.category_id.value,
      subcategory_id: this.f.subcategory_id.value,
      tags: this.tagsString,
      venue_tobe_announced: this.recurringStore,
      hosting: this.hosting,
      ticketing: this.f.ticketing.value
    };
    return data;
  }

  setRecurring(value: any): void {
    this.f.recurring.setValue(value);
  }

  setHosting(value: any): void {
    // this.f.hosting.setValue(value);
    this.form.controls['hosting'].setValue(value);
    // console.log(this.form.controls['hosting'].value)
    this.hosting =  this.form.controls['hosting'].value
    console.log(value)

    console.log(value);
    this.f.hosting.setValue(value);
    this.setHostingValidators();
  }

  setHostingValidators() {
    if (this.f.hosting.value == '1') {
      console.log('...adding physical event validators');
      this.f.venue.setValidators(Validators.required);
      this.f.gps.setValidators(Validators.required);
      this.f.venue.updateValueAndValidity();
      this.f.gps.updateValueAndValidity();
    }
    else if (this.f.hosting.value == '0') {
      console.log('...removing physical event validators');
      this.f.venue.clearValidators();
      this.f.gps.clearValidators();
      this.f.venue.updateValueAndValidity();
      this.f.gps.updateValueAndValidity();
    }
  }

  toggleVenueView(): void {
    this.f.venue_tobe_announced.valueChanges.subscribe((change: any) => {
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
    this.f.subcategory_id.disable();
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

  saveCreatedEvent(eventId: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.basicInfoService.getCreatedEvent(eventId).then(
        res => {
          console.log(res);
          sessionStorage.removeItem('created_event');
          sessionStorage.setItem('created_event', JSON.stringify(res));
          resolve(true);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
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

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 200); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
  }

}
