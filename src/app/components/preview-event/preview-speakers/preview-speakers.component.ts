import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PreviewSpeakerModalComponent } from '../preview-speaker-modal/preview-speaker-modal.component';

@Component({
  selector: 'app-preview-speakers',
  templateUrl: './preview-speakers.component.html',
  styleUrls: ['./preview-speakers.component.scss']
})
export class PreviewSpeakersComponent implements OnInit {

  @Input() speakers?: any;
  closeResult = '';
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(e: any, i: any) {
    e.preventDefault();
    this.dialog.open(PreviewSpeakerModalComponent, {data: this.speakers[i]});
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
