import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details/event-details.service';

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventDetailsService: EventDetailsService
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
      email: ['', Validators.email],
      phone: ['', [Validators.minLength(12), Validators.maxLength(12)]],
      hosted_on: [''],
      banner_image: [''],
      organizer: ['', Validators.required],
    });
  }

  create(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      this.isLoading = true;
      this.eventDetailsService.editEventDetails(this.getFormData()).then(
        res => {
          if (res) {
            this.isLoading = false;
            this.router.navigateByUrl('/create_event/ticketing');
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

}
