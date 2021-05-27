import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  isLoading: boolean;
  isBannerSet: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});
  imgSrc: string;
  formBuilder: any;

  constructor() {
    this.isLoading = false;
    this.isBannerSet = false;
    this.saved = false;
    this.imgSrc = '../../../../assets/images/avatar-placeholder.png';
  }  
  
  ngOnInit(): void {    
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      phone: ['', [Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],      
      hosted_on: [''],
      banner_image: [''],
    })
  }

}
