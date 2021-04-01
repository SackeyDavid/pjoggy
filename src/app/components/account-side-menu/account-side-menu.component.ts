import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher.service';

@Component({
  selector: 'app-account-side-menu',
  templateUrl: './account-side-menu.component.html',
  styleUrls: ['./account-side-menu.component.scss']
})
export class AccountSideMenuComponent implements OnInit {

  dark_theme: boolean = false

  constructor(
    private themeSwitcher: ThemeSwitcherService 
  ) { }

  ngOnInit(): void {
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
