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
  errorMsgs: any = {};
  showPrompt: Boolean = false;
  
  url: string = '';
  encryptionString = '';

  resetForm: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      new_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      new_password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.url = this.router.url
    this.encryptionString = this.url.split('id=').pop()!;
    console.log(this.url.split('id=').pop());
  }

  onSubmit(){
    console.log(this.resetForm.value);
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
