import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
// import {}  from 'googlemaps'

@Component({
  selector: 'app-preview-minimised-location',
  templateUrl: './preview-minimised-location.component.html',
  styleUrls: ['./preview-minimised-location.component.scss']
})
export class PreviewMinimisedLocationComponent implements OnInit {

  @Input() eventContent?: any;
  @Input() hostingContent?: any;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined

  facebookLinkCopied = false;
  youtubeLinkCopied = false;
  zoomLinkCopied = false;
  zoomIdCopied = false;
  zoomPasswordCopied = false;
  meetLinkCopied = false;
  meetPasswordCopied = false;
  teamsLinkCopied = false;
  teamsPasswordCopied = false;

  mapOptions: google.maps.MapOptions = {}
  mapMarker: any = {}

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let latitude = parseFloat(this.eventContent?.gps.split(", ")[0]);
    let longitude = parseFloat(this.eventContent?.gps.split(", ")[1]);

    console.log(this.eventContent?.gps);
    console.log(latitude);
    console.log(longitude);

    this.mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom : 14
    }
    this.mapMarker = {
      position: { lat: latitude, lng: longitude },
    }
  }

  ngAfterViewInit(): void {
  }

  openSnackBar() {
    this._snackBar.open('Copied to clipboard', 'x', {
      duration: 3000
    });
  }

  copyFacebookLink(){
    this.facebookLinkCopied = true;
    setTimeout(() => { this.facebookLinkCopied = false }, 3000);
    this.openSnackBar();
  }

  copyYoutubeLink(){
    this.youtubeLinkCopied = true;
    setTimeout(() => { this.youtubeLinkCopied = false }, 3000);
    this.openSnackBar();
  }

  copyZoomLink(){
    this.zoomLinkCopied = true;
    setTimeout(() => { this.zoomLinkCopied = false }, 3000);
    this.openSnackBar();
  }

  copyZoomId(){
    this.zoomIdCopied = true;
    setTimeout(() => { this.zoomIdCopied = false }, 3000);
    this.openSnackBar();
  }

  copyZoomPassword(){
    this.zoomPasswordCopied = true;
    setTimeout(() => { this.zoomPasswordCopied = false }, 3000);
    this.openSnackBar();
  }

  copyMeetLink(){
    this.meetLinkCopied = true;
    setTimeout(() => { this.meetLinkCopied = false }, 3000);
    this.openSnackBar();
  }

  copyMeetPassword(){
    this.meetLinkCopied = true;
    setTimeout(() => { this.meetLinkCopied = false }, 3000);
    this.openSnackBar();
  }

  copyTeamsLink(){
    this.teamsLinkCopied = true;
    setTimeout(() => { this.teamsLinkCopied = false }, 3000);
    this.openSnackBar();
  }

  copyTeamsPassword(){
    this.teamsPasswordCopied = true;
    setTimeout(() => { this.teamsPasswordCopied = false }, 3000);
    this.openSnackBar();
  }

}
