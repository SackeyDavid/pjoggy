import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../services/user-auth/user-auth.service'


@Component({
  selector: 'app-phone-authentication',
  templateUrl: './phone-authentication.component.html',
  styleUrls: ['./phone-authentication.component.scss']
})
export class PhoneAuthenticationComponent implements OnInit {

  isSending: boolean = false;
  errorMsgs: any;
  isResending: boolean = false;

  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 5)]

  authenticationForm: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) {
  }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image);
    
    this.authenticationForm = new FormGroup({
      confirmationCode: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    });
  }

  onSubmit(){
    console.log(this.authenticationForm.value);
    this.isSending = true;
    
    this.auth.authenticatePhone(this.authenticationForm.value.confirmationCode)
      .subscribe(
        res => {
          console.log(res);
          if (res.token) {
            sessionStorage.setItem('x_auth_token', res.token);
            sessionStorage.setItem('events_user_id', res.user.id);
            sessionStorage.setItem('events_user_name', res.user.name);
            sessionStorage.setItem('events_user_email', res.user.email);

            this.router.navigateByUrl('/');
          }
        },
        err => {
          console.log(err);
          this.isSending = false;
          this.errorMsgs = err.error;
        }
      );
  }

  resend(){
    this.isResending = true;

    // this.auth.resendPhoneAuth().subscribe(
    //   res => {
    //     console.log(res);
    //     sessionStorage.setItem('registration_id', res.id);        
    //     this.isResending = false;
    //   },
    //   err => {
    //     console.log(err)
    //     this.isResending = false;
    //     this.errorMsgs = err.error;
    //   }
    // );
  }
  
  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
