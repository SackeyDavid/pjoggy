import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../services/user-auth/user-auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isSending: boolean = false;
  saved: boolean = false;
  errorMsgs: any;

  loginForm: FormGroup = new FormGroup({});

  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 5)]

  constructor(private auth: UserAuthService, private router: Router) {
  }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image);

    const emailRegEx = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegEx)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);    
    this.saved = true;

    if (this.loginForm.valid) {
      this.isSending = true;
      this.auth.loginUser(this.loginForm.value)
        .subscribe(
          res => {
            console.log(res);

            if (res.phone) {
              sessionStorage.setItem('user_id', res.id);
              sessionStorage.setItem('user_phone', res.phone);
              this.router.navigateByUrl('/phone_authentication');
            } else if (res.token) {
              sessionStorage.setItem('user_id', res.user.id);
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
  }

  facebookSignUp() {
    window.location.href = this.auth.facebookAuthUrl;
  }
  
  googleSignUp() {
    window.location.href = this.auth.googleAuthUrl;
  }

  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



}
