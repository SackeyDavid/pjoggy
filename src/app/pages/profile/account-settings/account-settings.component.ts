import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  twoFA: boolean = false;
  userId: any;
  userPhone: any;

  isLoading: boolean;
  isSendingPassword: boolean;
  isSendingTwoFA: boolean;
  passwordMsg: string;
  passwordErrorMsgs: any;
  twoFaErrorMsgs: any;
  saved: boolean;
  twoFaForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  formBuilder: any;

  current_route:string = '';

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
    ) { 
    this.isLoading = false;
    this.isSendingPassword = false;
    this.isSendingTwoFA = false;
    this.passwordMsg = '';
    this.saved = false;
  }

  ngOnInit(): void {
    this.getUser();
    this.initTwoFaForm();
    this.initPasswordForm();
  }

  initTwoFaForm(): void {    
    this.twoFaForm = new FormGroup({
      country_code: new FormControl(),            
      phone: new FormControl(),            
    })
  }

  initPasswordForm(): void {
    this.passwordForm = new FormGroup({
      current_password: new FormControl(''),            
      new_password: new FormControl('', Validators.minLength(8)),            
      new_password_confirmation: new FormControl('', Validators.minLength(8)),            
    })
  }

  enablePhone() {
    console.log(this.twoFA);

    if(this.twoFA){
      this.twoFaForm.controls.country_code.enable();
      this.twoFaForm.controls.phone.enable();
    }
    else {
      this.twoFaForm.controls.country_code.disable();
      this.twoFaForm.controls.phone.disable();
    }
  }

  onTwoFaSubmit() {
    let formatedPhone = this.formatPhoneNo(this.twoFaForm.controls.country_code.value, this.twoFaForm.controls.phone.value);
    console.log(formatedPhone);
    this.isSendingTwoFA = true;

    let phoneData = { phone: formatedPhone };

    this.userAccountService.enableTwoFA(phoneData)
      .then(
        res => {
          console.log(res);
          this.twoFaErrorMsgs = [];
          this.isSendingTwoFA = false;
        },
        err => {
          console.log(err)
          this.isSendingTwoFA = false;
          this.twoFaErrorMsgs = err.error;
        }
      );
  }

  onPasswordSubmit(){
    this.isSendingPassword = true;

    let passwordData = {
      new_password: this.passwordForm.controls.new_password.value,
      new_password_confirmation: this.passwordForm.controls.new_password_confirmation.value,
      current_password: this.passwordForm.controls.current_password.value,
    }

    this.userAccountService.changePassword(passwordData, this.userId)
      .then(
        res => {
          console.log(res);
          this.isSendingPassword = false;
          this.passwordErrorMsgs = [];
          this.passwordMsg = res.message;
          
        },
        err => {
          console.log(err)
          this.isSendingPassword = false;
          this.passwordErrorMsgs = err.error;
        }
      );
  }
 
  getUser(): void {
    this.userAccountService.getCurrentUser().then(
      res => {
        console.log(res);
        this.userId = res.id;
        if(res.two_way == 1) this.twoFA = true;
        this.enablePhone();

        if (res.phone) {
          console.log('has phone');
          this.userPhone = res.phone;
          this.populateTwoFaForm();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  populateTwoFaForm() {
    var code, number;
    if(this.userPhone) {
      code = this.userPhone.substring(0,3);
      number = this.userPhone.substring(3);
      console.log(code);
      console.log(number);
    }
    else {
      code = null;
      number = null;
    }

    this.twoFaForm.controls.country_code.setValue(code);
    this.twoFaForm.controls.phone.setValue(number);
  }

  formatPhoneNo(code: any, phone: any){    
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
