import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media/media.service';
import _ from 'lodash';


@Component({
  selector: 'app-create-event-media',
  templateUrl: './create-event-media.component.html',
  styleUrls: ['./create-event-media.component.scss']
})
export class CreateEventMediaComponent implements OnInit {

  eventTitle: string = ''
  eventDate: string = ''

  form: FormGroup = new FormGroup({});
  isLoading: boolean;
  isImageSet: boolean;
  isImageMultiple: boolean;
  imageCount: number;
  imgSrcList: any[];
  createdImgSrc: any[];
  selectedImagesList: any;
  isVideoSet: boolean;
  videoSrcList: any[];
  createdVideoSrc: string;
  eventId: string;
  isImageSaving: boolean;
  isVideoSaving: boolean;
  imageError: boolean;
  videoError: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mediaService: MediaService
  ) { 
    this.isLoading = false;
    this.eventId = '';
    this.isImageSaving = false;
    this.isVideoSaving = false;
    this.isImageSet = false;
    this.isImageMultiple = false;
    this.imageCount = 0;
    this.imgSrcList = [];
    this.selectedImagesList = [];
    this.createdImgSrc = [];
    this.isVideoSet = false;
    this.videoSrcList = [];
    this.createdVideoSrc = '';
    this.imageError = false;
    this.videoError = false;

    this.initForm();
    this.getEventDetails();
    this.getExistingImages();
    this.getExistingVideos();
  }

  ngOnInit(): void {
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventTitle = data.event[0].title;
    this.eventDate = data.event[0].start_date_time    
  }

  public get f(): any {
    return this.form.controls;
  }

  initForm(){
    this.form = this.formBuilder.group({ 
      event_image: ['', Validators.required], 
      event_video: ['', Validators.required] 
    });
  }

  getEventDetails(): any {
    const rawData = sessionStorage.getItem('created_event');
    const eventData = rawData != null ? JSON.parse(rawData) : {};
    this.eventId = eventData.event[0].id;
    console.log(this.eventId);
  }

  createImage(): void {
    if (this.isImageSet) {
      if (this.createdImgSrc.length > 0){      
        for (let i = 0; i < this.selectedImagesList.length; i++) {
          console.log('sending ' + i + ' image');
          this.isImageSaving = true;
          this.mediaService.storeImage(this.selectedImagesList[i], this.eventId).then(
            res => {
              if (res) {
                this.isLoading = false;
                this.imgSrcList.unshift(this.createdImgSrc[i])
                this.isImageSet = false;
                this.isImageSaving = false;
                this.imageError = false;
                this.createdImgSrc = [];
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
        }
      }
    }
    else {
      this.imageError = true;
    }
  }

  getExistingImages(): any {
    this.mediaService.getImages(this.eventId).then(
      images => {
        _.forEach(images, (image, i) => {
          this.imgSrcList[i] = 'http://events369.logitall.biz/storage/event_images/' + images[i].url;
          console.log(this.imgSrcList[i]);
        });
      }
    );
  }

  onImageSelected(e: any){
    this.createdImgSrc = [];
    this.isImageMultiple = false;
    this.imageCount = 0;

    if (e.target.files.length > 1) {
      console.log('u selected ' + e.target.files.length + ' images');
      this.isImageMultiple = true;
      this.imageCount = e.target.files.length;
    }

    for (let i = 0; i < e.target.files.length; i++) {
      let file: File = e.target.files[i];      
      if (file) {
        this.isImageSet = true;
        this.selectedImagesList.push(file)        

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.createdImgSrc.push(e.target.result);
        }
      }
    }

    console.log(this.createdImgSrc);
  }

  // -------------------------------------------------------------------------------------------
  // videos

  createVideo(): void { 
    if(this.isVideoSet) { 
      this.mediaService.storeVideo(this.f.event_video.value, this.eventId).then(
        res => {
          if (res) {
            this.isLoading = false;
            this.videoSrcList.unshift(this.createdVideoSrc)
            this.isVideoSet = false;
            this.videoError = false;
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
    }
    else {
      this.videoError = true;
    }
  }

  getExistingVideos(): any {
    this.mediaService.getVideos(this.eventId).then(
      videos => {
        _.forEach(videos, (video, i) => {
          this.videoSrcList[i] = 'http://events369.logitall.biz/storage/event_videos/' + videos[i].url;
          console.log(this.videoSrcList[i]);
        });
      }
    );
  }

  onVideoSelected(e: any){
    const file:File = e.target.files[0];
    if (file) {
      this.isVideoSet = true;

      this.f.event_video.value = file;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.createdVideoSrc = e.target.result;
        // console.log(e.target.result);
      }
    }
  }

  previous(): void {
    this.router.navigateByUrl('/create_advanced/speakers');
  }

  save(): void {
    this.router.navigateByUrl('/create_advanced/sponsors');
  }

}
