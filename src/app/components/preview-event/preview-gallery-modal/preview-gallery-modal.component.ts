import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-preview-gallery-modal',
  templateUrl: './preview-gallery-modal.component.html',
  styleUrls: ['./preview-gallery-modal.component.scss']
})
export class PreviewGalleryModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
