import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details/event-details.service';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';

@Component({
  selector: 'app-edit-event-details',
  templateUrl: './edit-event-details.component.html',
  styleUrls: ['./edit-event-details.component.scss']
})
export class EditEventDetailsComponent implements OnInit {

  isLoading: boolean;
  isBannerSet: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});
  imgSrc: string;

  details: any = {
    banner_image: '',
    organizer: '',
    email: '',
    phone: '',
    hosted_on: '',
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventDetailsService: EventDetailsService,
    private basicInfoService: BasicInfoService,
  ) {
    this.isLoading = false;
    this.isBannerSet = false;
    this.saved = false;
    this.imgSrc = '../../../../assets/images/placeholder.png';
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.populateForm()
    this.initForm();
  }

  previous() {
    this.router.navigateByUrl('/create_event/schedule');
  }

  save() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/create_event/ticketing');
    }, 3500);
  }

  public get f(): any {
    return this.form.controls;
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      email: [this.details.email, Validators.email],
      phone: [this.details.phone, [Validators.minLength(12), Validators.maxLength(12)]],
      hosted_on: [this.details.hosted_on],
      banner_image: [this.details.banner_image],
      organizer: [this.details.organizer, Validators.required],
    });
  }

  edit(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      this.isLoading = true;
      var data: any =  sessionStorage.getItem('created_event');
      data = JSON.parse(data);
      var eventId = data.event[0].id;
      this.eventDetailsService.editEventDetails(this.getFormData(), this.f.banner_image.value, eventId).then(
        res => {
          if (res) {
            this.isLoading = false;
            this.router.navigateByUrl('/create_event/ticketing');
          }
          else {
            this.isLoading = false;
            alert("oops, didn't create");
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
  }

  onFileSelected(e: any){
    const file:File = e.target.files[0];
    if (file) {
      this.isBannerSet = true;

      const formData = new FormData();
      formData.append("thumbnail", file);

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      }
    }
  }

  getFormData(): any {
    const data = {
      email: this.f.email.value,
      phone: this.f.phone.value,
      hosted_on: this.f.hosted_on.value,
      banner_image: this.f.banner_image.value,
      organizer: this.f.organizer.value,
    };
    return data;
  }

  populateForm(): void {
        
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    console.log(data)
    this.details.banner_image = data.event[0].banner_image;    
    this.details.organizer = data.event[0].organizer;
    this.details.phone = data.event[0].contact_phone;
    this.details.email = data.event[0].contact_email;
    this.details.hosted_on = data.event[0].hosted_on;

    console.log(this.details)
      
  }
  
}
