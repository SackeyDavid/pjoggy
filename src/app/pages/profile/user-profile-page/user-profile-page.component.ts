import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  show_logged_in: boolean = false 

  constructor() { }

  ngOnInit(): void {
  }
  openAccountsPage() {
    
  }

  logIn() {
    
  }

}
