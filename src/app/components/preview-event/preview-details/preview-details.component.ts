import { Component, Input, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-preview-details',
  templateUrl: './preview-details.component.html',
  styleUrls: ['./preview-details.component.scss']
})
export class PreviewDetailsComponent implements OnInit {

  @Input() eventContent?: any;
  @Input() hostingContent?: any;
  
  facebookLinkCopied = false;
  youtubeLinkCopied = false;
  zoomLinkCopied = false;
  zoomIdCopied = false;
  zoomPasswordCopied = false;
  meetLinkCopied = false;
  meetPasswordCopied = false;
  teamsLinkCopied = false;
  teamsPasswordCopied = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  copyFacebookLink(){
    this.facebookLinkCopied = true;
    setTimeout(() => { this.facebookLinkCopied = false }, 2000);
  }

  copyYoutubeLink(){
    this.youtubeLinkCopied = true;
    setTimeout(() => { this.youtubeLinkCopied = false }, 2000);
  }
  
  copyZoomLink(){
    this.zoomLinkCopied = true;
    setTimeout(() => { this.zoomLinkCopied = false }, 2000);
  }

  copyZoomId(){
    this.zoomIdCopied = true;
    setTimeout(() => { this.zoomIdCopied = false }, 2000);
  }

  copyZoomPassword(){
    this.zoomPasswordCopied = true;
    setTimeout(() => { this.zoomPasswordCopied = false }, 2000);
  }

  copyMeetLink(){
    this.meetLinkCopied = true;
    setTimeout(() => { this.meetLinkCopied = false }, 2000);
  }

  copyMeetPassword(){
    this.meetLinkCopied = true;
    setTimeout(() => { this.meetLinkCopied = false }, 2000);
  }

  copyTeamsLink(){
    this.teamsLinkCopied = true;
    setTimeout(() => { this.teamsLinkCopied = false }, 2000);
  }

  copyTeamsPassword(){
    this.teamsPasswordCopied = true;
    setTimeout(() => { this.teamsPasswordCopied = false }, 2000);
  }

}
