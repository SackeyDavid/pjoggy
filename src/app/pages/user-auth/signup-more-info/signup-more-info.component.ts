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
  errorMsgs: any = {};
  showPrompt: Boolean = false;

  token_from_url: string = '';
  token: string = '';

  public registerForm: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
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
    this.isSending = true;

    this.auth.singupMoreInfo(this.registerForm.value).subscribe(
      res => {
        console.log(res);        
        if(res.message == 'Ok') this.showPrompt = true;
      },
      err => {
        console.log(err)
        this.isSending = false;
        this.errorMsgs = err.error;
      }
    );
  }
}
