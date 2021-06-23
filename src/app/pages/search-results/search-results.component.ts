import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchData: any;

  constructor(private router: Router, private serachService: SearchService) { }

  ngOnInit(): void {
    this.searchEvent();
  }

  searchEvent(){
    this.searchData = null;
    this.serachService.searchEvent().then(
      res => {
        if (res) {
          console.log(res);  
          this.searchData = res.events.data;        
        }        
      },
      err => {
        console.log(err);
      }
    );
  }
  
  gotoPreview(eventId: any) {
    sessionStorage.setItem('preview_event_id', eventId);
    this.router.navigateByUrl('/event_details');
  }

}
