import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  passwordSaved: boolean;
  twoFaSaved: boolean;
  twoFaForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  formBuilder: any;

  current_route:string = '';

  constructor(
    private userAccountService: UserAccountService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { 
    this.isLoading = false;
    this.isSendingPassword = false;
    this.isSendingTwoFA = false;
    this.passwordMsg = '';
    this.passwordSaved = false;
    this.twoFaSaved = false;
  }

  ngOnInit(): void {
    this.getUser();
    this.initTwoFaForm();
    this.initPasswordForm();
  }

  initTwoFaForm(): void {    
    this.twoFaForm = new FormGroup({
      country_code: new FormControl(),            
      phone: new FormControl('', [Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]), 
    })
  }

  initPasswordForm(): void {
    this.passwordForm = new FormGroup({
      current_password: new FormControl('', Validators.required),            
      new_password: new FormControl('', [Validators.minLength(8), Validators.required]),            
      new_password_confirmation: new FormControl('', [Validators.minLength(8), Validators.required]),            
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

      this.disableTwoFa();
    }
  }

  onTwoFaSubmit() {
    let formatedPhone = this.formatPhoneNo(this.twoFaForm.controls.country_code.value, this.twoFaForm.controls.phone.value);
    console.log(formatedPhone);    
    let phoneData = { phone: formatedPhone };

    this.twoFaSaved = true;
    if (this.twoFaForm.valid) {
      this.isSendingTwoFA = true;
      this.userAccountService.enableTwoFA(phoneData)
        .then(
          res => {
            console.log(res);
            this.twoFaErrorMsgs = [];
            this.isSendingTwoFA = false;
            this.openSnackBar('2fa enabled');
          },
          err => {
            console.log(err)
            this.isSendingTwoFA = false;
            this.twoFaErrorMsgs = err.error;
          }
        );
    }
  }

  disableTwoFa() {
    this.userAccountService.disableTwoFa()
      .then(
        res => {
          console.log(res);
          this.openSnackBar('2fa disabled');
        },
        err => {
          console.log(err)
        }
      );
  }

  onPasswordSubmit(){ 
    this.passwordSaved = true;   
    let passwordData = {
      new_password: this.passwordForm.controls.new_password.value,
      new_password_confirmation: this.passwordForm.controls.new_password_confirmation.value,
      current_password: this.passwordForm.controls.current_password.value,
    }

    if (this.passwordForm.valid) {
      this.isSendingPassword = true;
      this.userAccountService.changePassword(passwordData, this.userId)
        .then(
          res => {
            console.log(res);
            this.isSendingPassword = false;
            this.passwordErrorMsgs = [];

            if (res.message == "OK") {
              this.openSnackBar('Password reset successessful');
              this.passwordMsg = '';
              this.router.navigateByUrl('/login');
            }
            else {
              this.passwordMsg = res.message;
              console.log(res.message);
            }            
          },
          err => {
            console.log(err)
            this.isSendingPassword = false;
            this.passwordErrorMsgs = err.error;
          }
        );
    }
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

  openSnackBar(message: string) {
    this._snackBar.open(message, 'x', {
      duration: 3000
    });
  }  

}
