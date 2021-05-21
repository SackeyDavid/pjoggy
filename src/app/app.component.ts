import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'events369-ui';

  onActivate(e: any) {
    window.scrollTo(0,0);
  }
  
}
