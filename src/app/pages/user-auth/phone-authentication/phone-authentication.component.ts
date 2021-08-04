import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../services/user-auth/user-auth.service'


@Component({
  selector: 'app-phone-authentication',
  templateUrl: './phone-authentication.component.html',
  styleUrls: ['./phone-authentication.component.scss']
})
export class PhoneAuthenticationComponent implements OnInit {

  isSending: boolean = false;
  saved: boolean = false;
  errorMsgs: any;
  isResending: boolean = false;
  users_phone: string = 'your phone';

  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 5)]

  authenticationForm: FormGroup = new FormGroup({});

  constructor(
    private auth: UserAuthService, 
    private router: Router,
    private _snackBar: MatSnackBar
    ) 
    {

    }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image);
    var users_phone = sessionStorage.getItem('user_phone');
    if(users_phone != null) this.users_phone = users_phone;
    
    this.authenticationForm = new FormGroup({
      confirmationCode: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    });
  }

  onSubmit(){
    console.log(this.authenticationForm.value);
    this.saved = true;

    if (this.authenticationForm.valid) {      
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

            // redirect to intended route if user came here because of authguard
            // this.auth.isLoggedIn = true;
            if (this.auth.redirectUrl) {
              this.router.navigate([this.auth.redirectUrl]);
              this.auth.redirectUrl = null;
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

  resend(e: any){
    e.preventDefault();

    this.auth.resendPhoneCode().subscribe(
      res => {
        console.log(res);
        this.openSnackBar('Code successfully resent')
      },
      err => {
        console.log(err)
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      duration: 3000
    });
  }  
  
  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
