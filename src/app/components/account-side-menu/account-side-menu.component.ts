import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher/theme-switcher.service';

@Component({
  selector: 'app-account-side-menu',
  templateUrl: './account-side-menu.component.html',
  styleUrls: ['./account-side-menu.component.scss']
})
export class AccountSideMenuComponent implements OnInit {

  dark_theme: boolean = false
  current_route: string = '';

  constructor(
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.current_route = this.router.url
    this.current_route = this.current_route.split('account/')[1]
    console.log(this.current_route)
  }

  

  switchTheme() {
    
    if(!this.dark_theme) {
      console.log(document.body.setAttribute('class', 'dark-theme'))
      this.dark_theme = true;

      
    } else {
      console.log(document.body.removeAttribute('class'))
      this.dark_theme = false;

    }
    
    
  
  }

}
