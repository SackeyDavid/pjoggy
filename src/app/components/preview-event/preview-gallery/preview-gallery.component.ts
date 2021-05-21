import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-gallery',
  templateUrl: './preview-gallery.component.html',
  styleUrls: ['./preview-gallery.component.scss']
})
export class PreviewGalleryComponent implements OnInit {

  @Input() images?: any;

  viewImage: any;

  sliderOptions = {
    items: 5,
    nav: true,
    margin: 30,
    // center: true,
    loop: true,
    autoplay: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

  setImage(e: any, i: any){
    e.preventDefault();
    this.viewImage = this.images[i].url;
    console.log(this.images[i].url);
  }

}
