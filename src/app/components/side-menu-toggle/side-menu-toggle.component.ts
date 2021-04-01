import { Component, OnInit, Input } from '@angular/core';
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

}
