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
      phone: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      usertype: new FormControl('30', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }

  onSubmit(){
    console.log(this.registerForm.value);
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

}
