import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social-share-modal',
  templateUrl: './social-share-modal.component.html',
  styleUrls: ['./social-share-modal.component.scss']
})
export class SocialShareModalComponent implements OnInit {

  url: string = '';
  title: string = '';
  dataUrl: string = '';
  dataContent: any;
  eventContent: any;

  constructor(
    private _snackBar: MatSnackBar,
    public modalRef: MdbModalRef<SocialShareModalComponent>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.dataUrl = 'http://events369.logitall.biz/api/get_event_data/' + this.id;
    // this.getData();
  }

  dataCall() {
    return this.http.get(this.dataUrl);

  }

  getData() {
    this.dataCall()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.dataContent = res;

          this.eventContent = this.dataContent.event[0];
          
        },
        (err: any) => {
          console.log(err)
        }
      );
  }


  openSnackBar() {
    this._snackBar.open('Copied to clipboard', 'x', {
      duration: 3000
    });
  }

}
