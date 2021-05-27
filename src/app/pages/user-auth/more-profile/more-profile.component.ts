import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatStepper } from '@angular/material/stepper';

import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';


@Component({
  selector: 'app-more-profile',
  templateUrl: './more-profile.component.html',
  styleUrls: ['./more-profile.component.scss']
})
export class MoreProfileComponent implements OnInit {

  isSending: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false;
  
  @ViewChild('registerStepper') private stepper?: MatStepper;

  public registerForm: FormGroup = new FormGroup({});
  
  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      country_code: new FormControl('', Validators.required),            
      phone: new FormControl('', Validators.required),            
      dob: new FormControl('', Validators.required),            
      user_type: new FormControl('', Validators.required),            
      country: new FormControl('', Validators.required),            
      gender: new FormControl('', Validators.required),            
    });
  }

  public get f(): any {
    return this.registerForm.controls;
  }

  getFormData(): any {
    const data = {
      country: this.f.country.value,
      phone: this.formatPhoneNo(),
      usertype: this.f.usertype.value,
      dob: this.f.username.value,
      gender: this.f.email.value,
    };
    return data;
  }

  onSubmit(){
    console.log(this.getFormData());
    this.isSending = true;

    this.auth.regsiterUser(this.getFormData())
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
