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
  showPrompt: Boolean = true;

  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 5)]


  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image);

    this.url = this.router.url
    this.encryptionString = this.url.split('id=').pop()!;
    console.log(this.url.split('id=').pop());
  }

  onResend(){
    this.isSending = true;

    this.auth.resendActivationLink(this.encryptionString).subscribe(
      res => {
        console.log(res);     
        if (res.message == "Ok") this.showPrompt = false; 
      },
      err => {
        console.log(err)
        this.isSending = false;
      }
    );
  }
  
  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
