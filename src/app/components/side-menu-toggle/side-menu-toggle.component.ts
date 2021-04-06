import { Component, OnInit, Input } from '@angular/core';
import moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-side-menu-toggle',
  templateUrl: './side-menu-toggle.component.html',
  styleUrls: ['./side-menu-toggle.component.scss']
})
export class SideMenuToggleComponent implements OnInit {

  @Input() eventTitle: any;
  @Input() eventDate: any;
  
  constructor() {
    // console.log(_x.side)
   }

  ngOnInit(): void {
    // $('button').click(function(){alert('Wass up!'); });
  }

  toggleSideMenu() {
    
    $('#side_bar').attr('class', 'sidenav slide-right');
  }

  
  getEventStartDateFormatted(date: any) {
    return moment(date).format('ddd, MMM D, YYYY h:mm A')
  }

}
