import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';

@Component({
  selector: 'app-google-magiclink',
  templateUrl: './google-magiclink.component.html',
  styleUrls: ['./google-magiclink.component.scss']
})
export class GoogleMagiclinkComponent implements OnInit {

  isSending: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false;

  images = ['../../../../assets/images/samantha-gades-fIHozNWfcvs-unsplash.webp', '../../../../assets/images/pexels-august-de-richelieu-4262413.jpg', '../../../../assets/images/pexels-christina-morillo-1181433.jpg', '../../../../assets/images/pexels-jopwell-2422280.jpg', '../../../../assets/images/pexels-nandhu-kumar-1613240.jpg', '../../../../assets/images/istockphoto-1243928117-612x612.jpg']
  image = this.images[this.getRandomInt(0, 5)]

  string_from_url: string = '';

  id: string = '';
  name: string = '';
  platform: string = '';
  platform_id: string = '';
  user_token: any = '';
  

  public loginForm: FormGroup = new FormGroup({});
  public magicLinkData: FormGroup = new FormGroup({});

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    document.getElementById('image-bg')?.setAttribute('src', this.image)

    this.string_from_url = decodeURI(this.router.url);

    var ind1 = this.string_from_url.indexOf('=');
    var ind2 = this.string_from_url.indexOf('&', ind1 + 1);
    

    this.id = this.string_from_url.substring(ind1+1, ind2);
    console.log(this.id)

    
    // check if the url has a token which means user's email isn't associated with any events369 account
    if (this.string_from_url.includes('token')) {
      
      var token = this.string_from_url.match(new RegExp('token=' + "(.*)" + '&message'));

      if (token) this.user_token = token[1];

      console.log(this.user_token)

      sessionStorage.setItem('user_id', this.id);
      sessionStorage.setItem('x_auth_token', this.user_token);
      
      if (this.user_token != null) this.router.navigateByUrl('/');


    }

    
    // check if the url has a platform_id which means user's email is associated with an events369 account
    if (this.string_from_url.includes('platform_id')) {

      var name = this.string_from_url.match(new RegExp('&name=' + "(.*)" + '&platform_id'));
      if (name) {
        this.name = name[1];
      }
      sessionStorage.setItem('events_user_name', this.name);

      var platform_id = this.string_from_url.match(new RegExp('&platform_id=' + "(.*)" + '&platform='));
      if (platform_id) this.platform_id = platform_id[1];

      var platform = this.string_from_url.match(new RegExp('&platform=' + "(.*)" + '&message'));
      if (platform) this.platform = platform[1];

      sessionStorage.setItem('user_id', this.id);

      this.magicLinkData = new FormGroup({
        id: new FormControl(this.id, [Validators.required]),
        name: new FormControl(this.name, [Validators.required]),
        platform: new FormControl(this.platform, [Validators.required]),
        platform_id: new FormControl(this.platform_id, [Validators.required]),
      });


    }  

    

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });


  }

  onSubmit() {

    this.auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          console.log(res);

          sessionStorage.setItem('user_id', res.user.id);
          sessionStorage.setItem('x_auth_token', res.token);

          sessionStorage.setItem('user_id', res.id);
          sessionStorage.setItem('user_phone', res.phone);

          // TODO: reroute according 2fa 

          if (res.user.id) this.router.navigateByUrl('/');
          this.isSending = false;
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

  sendMagicLink() {
    console.log(this.magicLinkData.value);
    this.isSending = true;

    this.auth.sendMagicLink(this.magicLinkData.value).subscribe(
      res => {
        console.log(res);        
        if(res.message == 'Ok') this.showPrompt = true;
        
        this.isSending = false;
        
      },
      err => {
        console.log(err)
        this.isSending = false;
        this.errorMsgs = err.error;
      }
    );
  }

  login() {
    
  }

}
