import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';


@Component({
  selector: 'app-facebook-magiclink',
  templateUrl: './facebook-magiclink.component.html',
  styleUrls: ['./facebook-magiclink.component.scss']
})
export class FacebookMagiclinkComponent implements OnInit {

  isSending: boolean = false;
  errorMsgs: any = {};
  showPrompt: Boolean = false; 
  url: string = '';
  encryptionString = '';


  public registerForm: FormGroup = new FormGroup({});
  public magicLinkData: FormGroup = new FormGroup({});

  string_from_url: string = '';
  message: string = '';

  
  id: string = '';
  name: string = '';
  platform: string = '';
  platform_id: string = '';
  user_token: any = '';

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.string_from_url = decodeURI(this.router.url);
    this.message = this.string_from_url.split('&message=')[1]

    
    this.url = this.router.url
    this.encryptionString = this.url.split('id=').pop()!;
    console.log(this.url.split('id=').pop());
        
    console.log(this.message)

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

      var name = this.string_from_url.match(new RegExp('&name=' + "(.*)" + '&message'));
      if (name) {
        this.name = name[1];
      }
      sessionStorage.setItem('events_user_name', this.name);

      var platform_id = this.string_from_url.match(new RegExp('&platform_id=' + "(.*)" + '&platform='));
      if (platform_id) this.platform_id = platform_id[1];

      var platform = this.string_from_url.match(new RegExp('&platform=' + "(.*)" + '&name'));
      if (platform) this.platform = platform[1];

      sessionStorage.setItem('user_id', this.id);

      this.magicLinkData = new FormGroup({
        id: new FormControl(this.id, [Validators.required]),
        name: new FormControl(this.name, [Validators.required]),
        platform: new FormControl(this.platform, [Validators.required]),
        platform_id: new FormControl(this.platform_id, [Validators.required]),
      });


    }  


    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    
  }

  onResend(){
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

  // resendMagic

}
