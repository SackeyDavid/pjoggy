import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';


@Component({
  selector: 'app-signup-more-info',
  templateUrl: './signup-more-info.component.html',
  styleUrls: ['./signup-more-info.component.scss']
})
export class SignupMoreInfoComponent implements OnInit {

  isSending: boolean = false;
  saved: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false;

  token_from_url: string = '';
  token: string = '';


  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 5)]


  public registerForm: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image);

    this.token_from_url = this.router.url
    var ind1 = this.token_from_url.indexOf('/');
    var ind2 = this.token_from_url.indexOf('=', ind1 + 1);
    this.token = this.token_from_url.substring(ind2 + 1);
    sessionStorage.setItem('registration_id', this.token);
    // var ind4 = this.token_from_url.indexOf('-', ind3 + 1);
    
    this.registerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.saved = true;

    if (this.registerForm.valid) {
      this.isSending = true;
      this.auth.singupMoreInfo(this.registerForm.value).subscribe(
        res => {
          console.log(res);        
          if(res.message == 'Ok') this.showPrompt = true;
          
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
          console.log(err)
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
