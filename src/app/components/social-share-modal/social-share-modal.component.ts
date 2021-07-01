import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-social-share-modal',
  templateUrl: './social-share-modal.component.html',
  styleUrls: ['./social-share-modal.component.scss']
})
export class SocialShareModalComponent implements OnInit {

  url: string = '';

  constructor(
    public modalRef: MdbModalRef<SocialShareModalComponent>
  ) { }

  ngOnInit(): void {
  }

}
