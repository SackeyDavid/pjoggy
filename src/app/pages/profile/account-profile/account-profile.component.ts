import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatetimeFormatterService } from 'src/app/services/datetime-formatter/datetime-formatter.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

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

}
























// switch (country) {
    //   case value: "AF"
    //    return 'Afghanistan';
    //    break;  
       
    //   case value:"AX"
    //     return 'Aland Islands';
      
    //   case value: "AL"
    //     return 'Albania'
        
    //   case value: "DZ"
    //   Algeria
    //   case value:"AS"
    //   American Samoa
    //   case value:"AD"
    //   Andorra
    //   case value:"AO"
    //   Angola
    //   case value:"AI"
    //   Anguilla
    //   case value:"AQ"
    //   Antarctica
    //   case value:"AG"
    //   Antigua and Barbuda
    //   case value:"AR"
    //   Argentina
    //   case value:"AM"
    //   Armenia
    //   case value:"AW"Aruba
    //   case value:"AU"Australia
    //   case value:"AT"Austria
    //   case value:"AZ"Azerbaijan
    //   case value:"BS"Bahamas
    //   case value:"BH"Bahrain
    //   case value:"BD"Bangladesh
    //   case value:"BB"Barbados
    //   case value:"BY"Belarus
    //   case value:"BE"Belgium
    //   case value:"BZ"Belize
    //   case value:"BJ"Benin
    //   case value:"BM"Bermuda
    //   case value:"BT"Bhutan
    //   case value:"BO"Bolivia
    //   case value:"BQ"Bonaire, Sint Eustatius and Saba
    //   case value:"BA"Bosnia and Herzegovina
    //   case value:"BW"Botswana
    //   case value:"BV"Bouvet Island
    //   case value:"BR"Brazil
    //   case value:"IO"British Indian Ocean Territory
    //   case value:"BN"Brunei Darussalam
    //   case value:"BG"Bulgaria
    //   case value:"BF"Burkina Faso
    //   case value:"BI"Burundi
    //   case value:"KH"Cambodia
    //   case value:"CM"Cameroon
    //   case value:"CA"Canada
    //   case value:"CV"Cape Verde
    //   case value:"KY"Cayman Islands
    //   case value:"CF"Central African Republic
    //   case value:"TD"Chad
    //   case value:"CL"Chile
    //   case value:"CN"China
    //   case value:"CX"Christmas Island
    //   case value:"CC"Cocos (Keeling) Islands
    //   case value:"CO"Colombia
    //   case value:"KM"Comoros
    //   case value:"CG"Congo
    //   case value:"CD"Congo, Democratic Republic of the Congo
    //   case value:"CK"Cook Islands
    //   case value:"CR"Costa Rica
    //   case value:"CI"Cote D'Ivoire
    //   case value:"HR"Croatia
    //   case value:"CU"Cuba
    //   case value:"CW"Curacao
    //   case value:"CY"Cyprus
    //   case value:"CZ"Czech Republic
    //   case value:"DK"Denmark
    //   case value:"DJ"Djibouti
    //   case value:"DM"Dominica
    //   case value:"DO"Dominican Republic
    //   case value:"EC"Ecuador
    //   case value:"EG"Egypt
    //   case value:"SV"El Salvador
    //   case value:"GQ"Equatorial Guinea
    //   case value:"ER"Eritrea
    //   case value:"EE"Estonia
    //   case value:"ET"Ethiopia
    //   case value:"FK"Falkland Islands (Malvinas)
    //   case value:"FO"Faroe Islands
    //   case value:"FJ"Fiji
    //   case value:"FI"Finland
    //   case value:"FR"France
    //   case value:"GF"French Guiana
    //   case value:"PF"French Polynesia
    //   case value:"TF"French Southern Territories
    //   case value:"GA"Gabon
    //   case value:"GM"Gambia
    //   case value:"GE"Georgia
    //   case value:"DE"Germany
    //   case value:"GH"Ghana
    //   case value:"GI"Gibraltar
    //   case value:"GR"Greece
    //   case value:"GL"Greenland
    //   case value:"GD"Grenada
    //   case value:"GP"Guadeloupe
    //   case value:"GU"Guam
    //   case value:"GT"Guatemala
    //   case value:"GG"Guernsey
    //   case value:"GN"Guinea
    //   case value:"GW"Guinea-Bissau
    //   case value:"GY"Guyana
    //   case value:"HT"Haiti
    //   case value:"HM"Heard Island and Mcdonald Islands
    //   case value:"VA"Holy See (Vatican City State)
    //   case value:"HN"Honduras
    //   case value:"HK"Hong Kong
    //   case value:"HU"Hungary
    //   case value:"IS"Iceland
    //   case value:"IN"India
    //   case value:"ID"Indonesia
    //   case value:"IR"Iran, Islamic Republic of
    //   case value:"IQ"Iraq
    //   case value:"IE"Ireland
    //   case value:"IM"Isle of Man
    //   case value:"IL"Israel
    //   case value:"IT"Italy
    //   case value:"JM"Jamaica
    //   case value:"JP"Japan
    //   case value:"JE"Jersey
    //   case value:"JO"Jordan
    //   case value:"KZ"Kazakhstan
    //   case value:"KE"Kenya
    //   case value:"KI"Kiribati
    //   case value:"KP"Korea, Democratic People's Republic of
    //   case value:"KR"Korea, Republic of
    //   case value:"XK"Kosovo
    //   case value:"KW"Kuwait
    //   case value:"KG"Kyrgyzstan
    //   case value:"LA"Lao People's Democratic Republic
    //   case value:"LV"Latvia
    //   case value:"LB"Lebanon
    //   case value:"LS"Lesotho
    //   case value:"LR"Liberia
    //   case value:"LY"Libyan Arab Jamahiriya
    //   case value:"LI"Liechtenstein
    //   case value:"LT"Lithuania
    //   case value:"LU"Luxembourg
    //   case value:"MO"Macao
    //   case value:"MK"Macedonia, the Former Yugoslav Republic of
    //   case value:"MG"Madagascar
    //   case value:"MW"Malawi
    //   case value:"MY"Malaysia
    //   case value:"MV"Maldives
    //   case value:"ML"Mali
    //   case value:"MT"Malta
    //   case value:"MH"Marshall Islands
    //   case value:"MQ"Martinique
    //   case value:"MR"Mauritania
    //   case value:"MU"Mauritius
    //   case value:"YT"Mayotte
    //   case value:"MX"Mexico
    //   case value:"FM"Micronesia, Federated States of
    //   case value:"MD"Moldova, Republic of
    //   case value:"MC"Monaco
    //   case value:"MN"Mongolia
    //   case value:"ME"Montenegro
    //   case value:"MS"Montserrat
    //   case value:"MA"Morocco
    //   case value:"MZ"Mozambique
    //   case value:"MM"Myanmar
    //   case value:"NA"Namibia
    //   case value:"NR"Nauru
    //   case value:"NP"Nepal
    //   case value:"NL"Netherlands
    //   case value:"AN"Netherlands Antilles
    //   case value:"NC"New Caledonia
    //   case value:"NZ"New Zealand
    //   case value:"NI"Nicaragua
    //   case value:"NE"Niger
    //   case value:"NG"Nigeria
    //   case value:"NU"Niue
    //   case value:"NF"Norfolk Island
    //   case value:"MP"Northern Mariana Islands
    //   case value:"NO"Norway
    //   case value:"OM"Oman
    //   case value:"PK"Pakistan
    //   case value:"PW"Palau
    //   case value:"PS"Palestinian Territory, Occupied
    //   case value:"PA"Panama
    //   case value:"PG"Papua New Guinea
    //   case value:"PY"Paraguay
    //   case value:"PE"Peru
    //   case value:"PH"Philippines
    //   case value:"PN"Pitcairn
    //   case value:"PL"Poland
    //   case value:"PT"Portugal
    //   case value:"PR"Puerto Rico
    //   case value:"QA"Qatar
    //   case value:"RE"Reunion
    //   case value:"RO"Romania
    //   case value:"RU"Russian Federation
    //   case value:"RW"Rwanda
    //   case value:"BL"Saint Barthelemy
    //   case value:"SH"Saint Helena
    //   case value:"KN"Saint Kitts and Nevis
    //   case value:"LC"Saint Lucia
    //   case value:"MF"Saint Martin
    //   case value:"PM"Saint Pierre and Miquelon
    //   case value:"VC"Saint Vincent and the Grenadines
    //   case value:"WS"Samoa
    //   case value:"SM"San Marino
    //   case value:"ST"Sao Tome and Principe
    //   case value:"SA"Saudi Arabia
    //   case value:"SN"Senegal
    //   case value:"RS"Serbia
    //   case value:"CS"Serbia and Montenegro
    //   case value:"SC"Seychelles
    //   case value:"SL"Sierra Leone
    //   case value:"SG"Singapore
    //   case value:"SX"Sint Maarten
    //   case value:"SK"Slovakia
    //   case value:"SI"Slovenia
    //   case value:"SB"Solomon Islands
    //   case value:"SO"Somalia
    //   case value:"ZA"South Africa
    //   case value:"GS"South Georgia and the South Sandwich Islands
    //   case value:"SS"South Sudan
    //   case value:"ES"Spain
    //   case value:"LK"Sri Lanka
    //   case value:"SD"Sudan
    //   case value:"SR"Suriname
    //   case value:"SJ"Svalbard and Jan Mayen
    //   case value:"SZ"Swaziland
    //   case value:"SE"Sweden
    //   case value:"CH"Switzerland
    //   case value:"SY"Syrian Arab Republic
    //   case value:"TW"Taiwan, Province of China
    //   case value:"TJ"Tajikistan
    //   case value:"TZ"Tanzania, United Republic of
    //   case value:"TH"Thailand
    //   case value:"TL"Timor-Leste
    //   case value:"TG"Togo
    //   case value:"TK"Tokelau
    //   case value:"TO"Tonga
    //   case value:"TT"Trinidad and Tobago
    //   case value:"TN"Tunisia
    //   case value:"TR"Turkey
    //   case value:"TM"Turkmenistan
    //   case value:"TC"Turks and Caicos Islands
    //   case value:"TV"Tuvalu
    //   case value:"UG"Uganda
    //   case value:"UA"Ukraine
    //   case value:"AE"United Arab Emirates
    //   case value:"GB"United Kingdom
    //   case value:"US"United States
    //   case value:"UM"United States Minor Outlying Islands
    //   case value:"UY"Uruguay
    //   case value:"UZ"Uzbekistan
    //   case value:"VU"Vanuatu
    //   case value:"VE"Venezuela
    //   case value:"VN"Viet Nam
    //   case value:"VG"Virgin Islands, British
    //   case value:"VI"Virgin Islands, U.s.
    //   case value:"WF"Wallis and Futuna
    //   case value:"EH"Western Sahara
    //   case value:"YE"Yemen
    //   case value:"ZM"Zambia
    //   case value:"ZW"Zimbabwe
    
    //   case value:
        
    //     break;
    
    //   default:
    //     break;
    // }
