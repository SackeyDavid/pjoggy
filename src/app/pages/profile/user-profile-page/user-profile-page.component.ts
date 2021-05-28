import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatetimeFormatterService } from 'src/app/services/datetime-formatter/datetime-formatter.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  show_logged_in: boolean = false 

  isLoading: boolean;
  isSending: boolean;
  isPhotoSet: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});
  imgSrc: string;
  formBuilder: any;
  currentUser: any;

  constructor(private userAccountsService: UserAccountService, private dtService: DatetimeFormatterService) {
    this.isLoading = false;
    this.isSending = false;
    this.isPhotoSet = false;
    this.saved = false;
    this.imgSrc = '../../../../assets/images/avatar-placeholder.png';
  }  
  
  ngOnInit(): void {    
    // this.initForm();
    this.getUser();
  }

  initForm(): void {
    var code, number;
    if(this.currentUser.phone){
      code = this.currentUser.phone.substring(0,3);
      number = this.currentUser.phone.substring(3);
      console.log(code);
      console.log(number);
    }
    else {
      code = '';
      number = '';
    }

    this.form = new FormGroup({
      firstname: new FormControl(this.currentUser?.firstname),            
      lastname: new FormControl(this.currentUser?.lastname),            
      country_code: new FormControl(code),            
      phone: new FormControl(number, [Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]),            
      dob: new FormControl(this.currentUser?.dob),            
      usertype: new FormControl(this.currentUser?.usertype),            
      country: new FormControl(this.currentUser?.country),            
      gender: new FormControl(this.currentUser?.gender),      
      photo: new FormControl(''),      
    })

    console.log(this.currentUser.firstname);
  }

  public get f(): any {
    return this.form.controls;
  }

  getFormData(): any {
    const data = {
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      country: this.f.country.value,
      phone: this.formatPhoneNo(),
      usertype: this.f.usertype.value,
      dob: this.dtService.formatDate(this.f.dob.value),
      gender: this.f.gender.value,
    };
    return data;
  }

  onSubmit(){
    console.log(this.getFormData());
    this.isSending = true;

    this.userAccountsService.editProfile(this.getFormData(), this.f.photo.value)
      .then(
        res => {
          console.log(res);
          this.isSending = false
        },
        err => {
          console.log(err)
          this.isSending = false;
          // this.errorMsgs = err.error;
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

  onFileSelected(e: any){
    const file:File = e.target.files[0];
    if (file) {
      this.isPhotoSet = true;

      this.f.photo.value = file;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      }
    }
  }

  getUser(): void {
    this.userAccountsService.getCurrentUser().then(
      res => {
        console.log(res);
        this.currentUser = res;
        this.initForm();

        if (res.profile) {
          this.imgSrc = 'http://events369.logitall.biz/storage/profile/' + res.profile
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getCountry(country: string) {
    return 'Accra, Ghana'
  }

  getYearJoined(date: string) {
    return new Date(date).getFullYear()
  }

  openAccountsPage() {
    
  }

  logIn() {
    
  }

}
