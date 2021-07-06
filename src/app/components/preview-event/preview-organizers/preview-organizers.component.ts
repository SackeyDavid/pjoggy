import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PreviewOrganizerModalComponent } from '../preview-organizer-modal/preview-organizer-modal.component';

@Component({
  selector: 'app-preview-organizers',
  templateUrl: './preview-organizers.component.html',
  styleUrls: ['./preview-organizers.component.scss']
})
export class PreviewOrganizersComponent implements OnInit {

  @Input() organizers?: any;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(e: any, i: any) {
    e.preventDefault();
    this.dialog.open(PreviewOrganizerModalComponent, {data: this.organizers[i]});
  }

  // cleanText(name: string) {
  //   return name.replace(/ /g,'');
  // }

}
