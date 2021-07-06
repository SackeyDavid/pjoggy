import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-preview-speaker-modal',
  templateUrl: './preview-speaker-modal.component.html',
  styleUrls: ['./preview-speaker-modal.component.scss']
})
export class PreviewSpeakerModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {
  }

}
