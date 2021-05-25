import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';

@Component({
  selector: 'app-email-invalid',
  templateUrl: './email-invalid.component.html',
  styleUrls: ['./email-invalid.component.scss']
})
export class EmailInvalidComponent implements OnInit {

  isSending: boolean = false;

  url: string = '';
  encryptionString = '';
  showPrompt: Boolean = false;

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.url = this.router.url
    this.encryptionString = this.url.split('id=').pop()!;
    console.log(this.url.split('id=').pop());
  }

  onResend(){
    this.isSending = true;

    this.auth.resendActivationLink(this.encryptionString).subscribe(
      res => {
        console.log(res);     
        if (res.message == "Ok") this.showPrompt = true; 
      },
      err => {
        console.log(err)
        this.isSending = false;
      }
    );
  }

}
