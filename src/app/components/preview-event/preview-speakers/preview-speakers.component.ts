import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview-speakers',
  templateUrl: './preview-speakers.component.html',
  styleUrls: ['./preview-speakers.component.scss']
})
export class PreviewSpeakersComponent implements OnInit {

  @Input() speakers?: any;
  closeResult = '';
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  
  
  // cleanText(name: string) {
  //   console.log(name);
  //   return name.replace(/ /g,'');
  // }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
