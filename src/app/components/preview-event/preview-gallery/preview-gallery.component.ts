import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewGalleryModalComponent } from '../preview-gallery-modal/preview-gallery-modal.component';

@Component({
  selector: 'app-preview-gallery',
  templateUrl: './preview-gallery.component.html',
  styleUrls: ['./preview-gallery.component.scss']
})
export class PreviewGalleryComponent implements OnInit {

  @Input() images?: any;  

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(e: any, i: any) {
    e.preventDefault();
    this.dialog.open(PreviewGalleryModalComponent, { data: { images: this.images, index: i } });
    console.log('opening modal');
  }

}
