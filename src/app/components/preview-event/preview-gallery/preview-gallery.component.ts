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

  sliderOptions = {
    items: 5,
    nav: true,
    margin: 30,
    // center: true,
    loop: true,
    autoplay: true,
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(e: any, i: any) {
    e.preventDefault();
    this.dialog.open(PreviewGalleryModalComponent, { data: this.images[i].url });
    console.log('opening modal');
  }

}
