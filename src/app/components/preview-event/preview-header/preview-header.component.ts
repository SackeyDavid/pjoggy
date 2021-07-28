import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preview-header',
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.scss']
})
export class PreviewHeaderComponent implements OnInit {

  constructor() { }

  @Input() intro?: Boolean;
  @Input() speakers?: Boolean;
  @Input() schedule?: Boolean;
  @Input() pricing?: Boolean;
  @Input() organizers?: Boolean;
  @Input() sponsors?: Boolean;
  @Input() gallery?: Boolean;
  @Input() location?: Boolean;

  @Output() introEvent = new EventEmitter<any>();
  @Output() speakersOrganizersEvent = new EventEmitter<any>();
  // @Output() scheduleEvent = new EventEmitter<any>();
  @Output() pricingSponsorsEvent = new EventEmitter<any>();
  // @Output() organizersEvent = new EventEmitter<any>();
  // @Output() sponsorsEvent = new EventEmitter<any>();
  @Output() galleryEvent = new EventEmitter<any>();
  // @Output() locationEvent = new EventEmitter<any>();

  ngOnInit(): void {
    
  }

  onIntroClicked(e: any) {
    e.preventDefault();
    this.introEvent.emit();
  }

  onSpeakersOrganizersClicked(e: any) {
    e.preventDefault();
    this.speakersOrganizersEvent.emit();
  }

  // onScheduleClicked(e: any) {
  //   e.preventDefault();
  //   this.scheduleEvent.emit();
  // }

  onPricingSponsorsClicked(e: any) {
    e.preventDefault();
    this.pricingSponsorsEvent.emit();
  }

  onGalleryClicked(e: any) {
    e.preventDefault();
    this.galleryEvent.emit();
  }

}
