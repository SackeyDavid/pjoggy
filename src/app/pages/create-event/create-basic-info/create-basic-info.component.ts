import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';


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

  url: string = ''
  currentRoute: string = ''

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private basicInfoService: BasicInfoService
  ) {
    this.isLoading = false;
    this.saved = false;
    this.categoriesData = [];
    this.subCategoriesData = [];
  }

  ngOnInit(): void {
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
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      venue: [''],
      gps: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      recurring: [0],
      type: ['', Validators.required],
      ticketing: ['', Validators.required],
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      tags: [''],
      venue_tobe_announced: [0],
      hosting: ['']
    });
  }

  create(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      this.isLoading = true;
      this.basicInfoService.createBasicEvent(this.getFormData()).then(
        res => {
          if (res) {
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
      title: this.f.title.value,
      description: this.f.description.value,
      venue: this.f.venue.value,
      gps: this.f.gps.value,
      start_date: '2021-04-04 01:30:00',
      end_date: '2021-04-11 15:30:00',
      // start_date: this.f.start_date.value + ' ' + this.f.start_time.value,
      // end_date: this.f.end_date.value + ' ' + this.f.end_time.value,
      recurring: this.f.recurring.value,
      type: this.f.type.value,
      category_id: this.f.category_id.value,
      subcategory_id: this.f.subcategory_id.value,
      tags: this.f.tags.value,
      venue_tobe_announced: this.f.venue_tobe_announced.value,
      hosting: this.f.hosting.value,
      ticketing: this.f.ticketing.value   
    };
    return data;
  }

  setRecurring(value: number): void {
    this.form.controls['recurring'].setValue(value);
  }

  setHosting(value: number): void {
    this.form.controls['recurring'].setValue(value);
  }

  toggleVenueView(): void {
    this.form.controls['venue_tobe_announced'].valueChanges.subscribe(change => {
      console.log(change);
      if (change == true) {
        this.form.controls['venue'].disable();
        this.form.controls['gps'].disable();
        this.form.controls['recurring'].setValue(1);
      }
      else if (change == false) {
        this.form.controls['venue'].enable();
        this.form.controls['gps'].enable();
        this.form.controls['recurring'].setValue(0)
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

}
