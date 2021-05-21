import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';


@Component({
  selector: 'app-signup-email',
  templateUrl: './signup-email.component.html',
  styleUrls: ['./signup-email.component.scss']
})
export class SignupEmailComponent implements OnInit {

  isSending: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false;

  public registerForm: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('30', Validators.required)
    });
  }  

  onSubmit(){
    this.isSending = true;

    this.auth.singupEmail(this.registerForm.value).subscribe(
      res => {
        console.log(res);
        sessionStorage.setItem('registration_id', res.id);        
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
