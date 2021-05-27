import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../services/user-auth/user-auth.service'


@Component({
  selector: 'app-recovery-email',
  templateUrl: './recovery-email.component.html',
  styleUrls: ['./recovery-email.component.scss']
})
export class RecoveryEmailComponent implements OnInit {

  isSending: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false;

  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 5)]


  recoveryForm: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) {
  }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image);
    
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(){
    console.log(this.recoveryForm.value);
    this.isSending = true;
    
    this.auth.accountRecovery(this.recoveryForm.value)
      .subscribe(
        res => {
          console.log(res);
          if (res.message == "OK") this.showPrompt = true;
        },
        err => {
          console.log(err);
          this.isSending = false;
          this.errorMsgs = err.error;
        }
      );
  }

  
  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
