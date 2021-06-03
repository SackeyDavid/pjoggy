import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../services/user-auth/user-auth.service'


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  isSending: boolean = false;
  saved: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false;
  
  url: string = '';
  encryptionString = '';  
  
  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 4)]


  resetForm: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) {
  }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image)

    this.resetForm = new FormGroup({
      new_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      new_password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.url = this.router.url
    this.encryptionString = this.url.split('id=').pop()!;
    console.log(this.url.split('id=').pop());
  }

  onSubmit(){
    console.log(this.resetForm.value);
    this.saved = true;

    if (this.resetForm.valid) {
      this.isSending = true;    
      this.auth.resetPassword(this.resetForm.value, this.encryptionString)
        .subscribe(
          res => {
            console.log(res);
            if (res.message == "Ok") this.showPrompt = true;
          },
          err => {
            console.log(err);
            this.isSending = false;
            this.errorMsgs = err.error;
          }
        );
    }
  }

  
  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
