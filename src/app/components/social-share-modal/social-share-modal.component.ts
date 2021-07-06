import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-social-share-modal',
  templateUrl: './social-share-modal.component.html',
  styleUrls: ['./social-share-modal.component.scss']
})
export class SocialShareModalComponent implements OnInit {

  url: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    public modalRef: MdbModalRef<SocialShareModalComponent>
  ) { }

  ngOnInit(): void {
  }

  openSnackBar() {
    this._snackBar.open('Copied to clipboard', 'x', {
      duration: 3000
    });
  }

}
