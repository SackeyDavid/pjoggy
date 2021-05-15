import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatStepper } from '@angular/material/stepper';

import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  @ViewChild('registerStepper') private stepper?: MatStepper;

  isSending: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false;

  public registerForm: FormGroup = new FormGroup({});
  
  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      country: new FormControl('GH', Validators.required),
      country_code: new FormControl('GH', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      usertype: new FormControl('30', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public get f(): any {
    return this.registerForm.controls;
  }

  getFormData(): any {
    const data = {
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      country: this.f.country.value,
      phone: this.formatPhoneNo(),
      usertype: this.f.usertype.value,
      username: this.f.username.value,
      email: this.f.email.value,
      password_confirmation: this.f.password_confirmation.value,
    };
    return data;
  }

  onSubmit(){
    console.log(this.getFormData());
    this.isSending = true;

    this.auth.regsiterUser(this.registerForm.value)
      .subscribe(
        res => {
          console.log(res);
          
          if(res.message == 'Ok') this.showPrompt = true;
        },
        err => {
          console.log(err)
          this.isSending = false;
          this.errorMsgs = err.error;

          this.stepper?.reset()
        }
      );
  }

  formatPhoneNo(){
    var code = this.f.country_code.value;
    let phone = this.f.phone.value;
    if (phone.length == 10 && phone.charAt(0) == '0') {
      phone = phone.substring(1);
      console.log(code + phone);
      return code + phone;
    }
    else if (phone.length == 9 && phone.charAt(0) != '0') {
      console.log(code + phone);
      return code + phone;
    }
    else return phone;
  }

}
