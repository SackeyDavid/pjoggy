import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-organizer-modal',
  templateUrl: './preview-organizer-modal.component.html',
  styleUrls: ['./preview-organizer-modal.component.scss']
})
export class PreviewOrganizerModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
