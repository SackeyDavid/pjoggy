import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details/event-details.service';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import _ from 'lodash';

@Component({
  selector: 'app-edit-event-details',
  templateUrl: './edit-event-details.component.html',
  styleUrls: ['./edit-event-details.component.scss']
})
export class EditEventDetailsComponent implements OnInit {

  eventTitle: string = ''
  eventDate: string = ''
  eventID: string = ''

  isLoading: boolean;
  isBannerSet: boolean;
  saved: boolean;
  form: FormGroup = new FormGroup({});
  imgSrc: string;
  imgStore: any;

  facebookVisibility: boolean;
  zoomVisibility: boolean;
  youtubeVisibility: boolean;
  meetVisibility: boolean;
  teamsVisibility: boolean;

  video: any;
  isVideoSet: boolean;
  videoSrcList: any[];
  createdVideoSrc: string;
  isVideoSaving: boolean;
  videoError: boolean;

  details: any = {
    banner_image: '',
    organizer: '',
    email: '',
    phone: '',
    hosted_on: '',
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventDetailsService: EventDetailsService,
    private basicInfoService: BasicInfoService,
  ) {
    this.isLoading = false;
    this.isBannerSet = true;
    this.saved = false;
    this.imgSrc = '../../../../assets/images/placeholder.png';

    this.isVideoSet = false;
    this.videoSrcList = [];
    this.createdVideoSrc = '';
    this.isVideoSaving = false;
    this.videoError = false;

    this.facebookVisibility = false;
    this.zoomVisibility = false;
    this.youtubeVisibility = false;
    this.meetVisibility = false;
    this.teamsVisibility = false;
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.populateForm()
    this.initForm();

    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventTitle = data.event[0].title;
    this.eventDate = data.event[0].start_date_time
    this.eventID = data.event[0].id

    this.getExistingVideos();
  }

  ngAfterContentInit(): void {
    this.imgSrc = 'http://events369.logitall.biz/storage/banner/' + this.details.banner_image;
    this.setHostingVisiblity();
  }

  previous() {
    this.router.navigateByUrl('/create_event/schedule');
  }

  save() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/create_event/ticketing');
    }, 3500);
  }

  public get f(): any {
    return this.form.controls;
  }

  initForm(): void {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.form = this.formBuilder.group({
      email: [this.details.email, Validators.email],
      phone: [this.details.phone, [Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],
      hosted_on: [this.details.hosted_on],
      banner_image: [''],
      organizer: [this.details.organizer, Validators.required],
      facebook_hosting: [this.details.hosted_on[0].link, Validators.pattern(urlRegex)],
      zoom_hosting: [this.details.hosted_on[1].link, Validators.pattern(urlRegex)],
      zoom_hosting_id: [this.details.hosted_on[1].meeting_id],
      zoom_hosting_password: [this.details.hosted_on[1].password, Validators.pattern(urlRegex)],
      youtube_hosting: [this.details.hosted_on[2].link, Validators.pattern(urlRegex)],
      meet_hosting: [this.details.hosted_on[3].link],
      meet_hosting_password: [this.details.hosted_on[3].password],
      teams_hosting: [this.details.hosted_on[4].link, Validators.pattern(urlRegex)],
      teams_hosting_password: [this.details.hosted_on[4].password],
      facebook_checkbox: [''],
      zoom_checkbox: [''],
      youtube_checkbox: [''],
      meet_checkbox: [''],
      teams_checkbox: [''],
      // video: ['', Validators.required]
    });
  }

  edit(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      console.log(this.getFormData());
      console.log( this.imgStore);
      // console.log( this.f.banner_image.value)
      this.isLoading = true;      
      this.eventDetailsService.editEventDetails(this.getFormData(), this.imgStore, this.eventID).then(
        res => {
          if (res) {
            this.isLoading = false;
            this.getCreatedEvent(this.eventID);
            
            this.saveCreatedEvent(this.eventID).then(
              ok => {
                if (ok) this.router.navigateByUrl('/create_event/ticketing');
              }                               
            );
          }
          else {
            this.isLoading = false;
            alert('oops, didn\'t create');
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      console.log('form data invalid');
      console.log(this.getFormData());
    }
  }

  onFileSelected(e: any){
    const file:File = e.target.files[0];
    if (file) {
      this.isBannerSet = true;

      // this.f.banner_image.value = file;
      this.imgStore = file;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      }
    }
  }

  getFormData(): any {
    let hostedObject = [
      { 'id': this.details.hosted_on[0].id, 'password': '', 'meeting_id': '', 'platform': 'Facebook', 'link': this.f.facebook_hosting.value },
      { 'id': this.details.hosted_on[1].id, 'password': this.f.zoom_hosting_password.value, 'meeting_id': this.f.zoom_hosting_id.value, 'platform': 'Zoom', 'link': this.f.zoom_hosting.value },
      { 'id': this.details.hosted_on[2].id, 'password': '', 'meeting_id': '', 'platform': 'Youtube', 'link': this.f.youtube_hosting.value },
      { 'id': this.details.hosted_on[3].id, 'password': this.f.meet_hosting_password.value, 'meeting_id': '', 'platform': 'Meet', 'link': this.f.meet_hosting.value },
      { 'id': this.details.hosted_on[4].id, 'password': this.f.teams_hosting_password.value, 'meeting_id': '', 'platform': 'Teams', 'link': this.f.teams_hosting.value }
    ]

    const data = {
      email: this.f.email.value,
      phone: this.f.phone.value,
      hosted_on: hostedObject,
      organizer: this.f.organizer.value,
    };
    return data;
  }

  populateForm(): void {
        
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    console.log(data)
    this.details.banner_image = data.event[0].banner_image;    
    this.details.organizer = data.organizers[0].name;
    this.details.phone = data.event[0].contact_phone;
    this.details.email = data.event[0].contact_email;
    this.details.hosted_on = data.hosted_on_links;

    console.log(this.details)
      
  }
  
  setFacebookVisibility(){
    this.facebookVisibility = this.f.facebook_checkbox.value;
  }

  setZoomVisibility(){
    this.zoomVisibility = this.f.zoom_checkbox.value;
  }

  setYoutubeVisibility(){
    this.youtubeVisibility = this.f.youtube_checkbox.value;
  }

  setMeetVisibility(){
    this.meetVisibility = this.f.meet_checkbox.value;
  }

  setTeamsVisibility(){
    this.teamsVisibility = this.f.teams_checkbox.value;
  }

  getCreatedEvent(eventId: any): void {
    this.eventDetailsService.getCreatedEvent(eventId).then(
      res => {
        console.log(res);
        sessionStorage.setItem('created_event', JSON.stringify(res));
      },
      err => {
        console.log(err);
      }
    );
  }

  saveCreatedEvent(eventId: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.basicInfoService.getCreatedEvent(eventId).then(
        res => {
          console.log(res);
          sessionStorage.removeItem('created_event');
          sessionStorage.setItem('created_event', JSON.stringify(res));
          resolve(true);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  setHostingVisiblity() {
    console.log(this.details.hosted_on);
    let x = this.details.hosted_on;
    if (x[0].link != '') {
      this.facebookVisibility = true;
      this.f.facebook_checkbox.value = true;
    }
    if (x[1].link != '') {
      this.zoomVisibility = true;
      this.f.zoom_checkbox.value = true;
    }
    if (x[2].link != '') {
      this.youtubeVisibility = true;
      this.f.youtube_checkbox.value = true;
    }
    if (x[3].link != '') {
      this.meetVisibility = true;
      this.f.meet_checkbox.value = true;
    }
    if (x[4].link != '') {
      this.teamsVisibility = true;
      this.f.teams_checkbox.value = true;
    }
  }

  // ----------------------------------------------------------------------------------------------------
  // live videos
  
  createVideo(): void { 
    if(this.isVideoSet) { 
      this.isVideoSaving = true; 
      console.log(this.video)
      this.eventDetailsService.storeVideo(this.video, this.eventID).then(
        res => {
          if (res) {
            this.isLoading = false;
            this.videoSrcList.unshift(this.createdVideoSrc)
            this.isVideoSet = false;
            this.isVideoSaving = false;
          }
          else {
            this.isLoading = false;
            alert('oops, didn\'t create');
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
          this.isVideoSaving = false;
        }
      );  
    }
    else {
      this.videoError = true;
    }
  }

  getExistingVideos(): any {
    this.eventDetailsService.getVideos(this.eventID).then(
      videos => {
        _.forEach(videos, (video, i) => {
          this.videoSrcList[i] = 'http://events369.logitall.biz/storage/live_videos/' + videos[i].url;
          console.log(this.videoSrcList[i]);
        });
      }
    );
  }

  onVideoSelected(e: any){
    const file:File = e.target.files[0];
    if (file) {
      this.isVideoSet = true;

      this.video = file;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.createdVideoSrc = e.target.result;
        // console.log(e.target.result);
      }
    }
  }

  openUsersEvents() {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      console.log(this.getFormData());
      console.log( this.imgStore);
      // console.log( this.f.banner_image.value)
      this.isLoading = true;      
      this.eventDetailsService.editEventDetails(this.getFormData(), this.imgStore, this.eventID).then(
        res => {
          if (res) {
            this.isLoading = false;
            this.getCreatedEvent(this.eventID);
            
            this.saveCreatedEvent(this.eventID).then(
              ok => {
                if (ok) this.router.navigateByUrl('/user_events');
              }                               
            );
          }
          else {
            this.isLoading = false;
            alert('oops, didn\'t create');
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      console.log('form data invalid');
      console.log(this.getFormData());
    }
  }

}


