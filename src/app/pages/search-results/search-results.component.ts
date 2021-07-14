import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { UsersFavoritesService } from 'src/app/services/users-favorites/users-favorites.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SocialShareModalComponent } from 'src/app/components/social-share-modal/social-share-modal.component';
import moment from 'moment';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchData: any;
  users_favorite_event_ids: any = []
  userID: any;
  userFavorites: any = []
  users_favorite_event_id_and_fav_id: any = []
  users_favorite_event_id_and_visibilty: any = []

  loading: boolean = false
  loadIndex: number = 5;
  searchQuery: any;

  modalRef: any;

  constructor(
    private router: Router,
    private serachService: SearchService,
    private userFavoriteService: UsersFavoritesService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('user_id');
    this.searchQuery = sessionStorage.getItem('search_query');

    this.getUsersFavorites()
    console.log(this.users_favorite_event_ids)

    this.searchEvent();
    this.getUsersFavorites()
  }

  searchEvent(){
    this.searchData = null;
    this.serachService.searchEvent().then(
      res => {
        if (res) {
          console.log(res);
          this.searchData = res.events;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getPopularEventsPage(url: string): void {
    this.serachService.searchEventsPage(url).then(
      res => {
        console.log(res);
        let nextEvents = []
        nextEvents = res.events
        nextEvents.data.sort(function(a: any, b:any){
            return new Date(a.start_date_time).valueOf() - new Date(b.start_date_time).valueOf();
          });
        nextEvents.data.forEach((event: any) => {
          this.searchData.data.push(event);
        });

        // assign id of next events to userfavorites id array
        if(this.userFavorites.data) this.getUsersFavoritesAfterNextPageLoad();

        // get the next_page_url of the new events data and assigned it to the respective category data
        this.searchData.next_page_url = nextEvents.next_page_url

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

  getUsersFavorites (){
    if(this.userID !== '') {
      this.userFavoriteService.getUserFavorites(this.userID).then(
        res => {
          console.log(res);
          this.userFavorites = res.event.data;
        },
        err => {
          console.log(err);
        }
      );
    }

    for (let i = 0; i < this.userFavorites.length; i++) {
      this.users_favorite_event_ids.push(this.userFavorites[i].id)
    }
  }

  getEventStartDateFormatted(date: any) {
    return moment(date).format('ddd, MMM D, YYYY h:mm A');
  }

  hasBeenAddedToFavorites(event_id: any) {
    return this.users_favorite_event_ids.includes(event_id)
  }

  saveEventAsFavorite(event_id: any): void {
    if(this.userID == null) {
      this.router.navigateByUrl('/login')
    }
    else {
      this.userFavoriteService.addFavoriteEvent(event_id, this.userID).then(
        res => {
          if (res) console.log(res);
          else console.log('didnt add to favorites');
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  removeEventFromFavorites(event_id: any): void {
    console.log(event_id)
    let favorite_id: any = ''

    for (let i = 0; i < this.users_favorite_event_id_and_fav_id.length; i++) {
      if(this.users_favorite_event_id_and_fav_id[i].event_id == event_id) {
          favorite_id = this.users_favorite_event_id_and_fav_id[i].fav_id
      }
    }
    console.log(this.users_favorite_event_id_and_fav_id)
      console.log(favorite_id)

      this.userFavoriteService.removeEventFromFavorite(favorite_id).then(
        res => {
          if (res) console.log(res);
          else console.log('didnt remove to favorites');
        },
        err => {
          console.log(err);
        }
      );
  }

  getTicketSalesStatus(ticket_sales_end_date: string) {
    if (ticket_sales_end_date == null) return 1;

    var ticket_end_date = ticket_sales_end_date.split(' ')[0];
    var ticket_end_time = ticket_sales_end_date.split(' ')[1];

    let date = new Date();
    date.setHours(0,0,0,0);
    let today = date.valueOf();
    // let sd = Date.parse(this.f.start_date.value);
    let ed = Date.parse(ticket_end_date);
    let now = new Date().getTime();
    // let st = new Date(this.f.start_time.value).getTime();
    let et = new Date(ticket_end_time).getTime();

    // check if ticket sale end date  and timeis greater start date  and time

    if (ed > today && et > now) {
      return 0;
    } else {
      return 1;
    }
  }

  loadMore() {
    this.loading = true
    if(this.loadIndex < this.searchData.length) {
      this.loadIndex += 5
    }

    this.loading = false
  }

  getUsersFavoritesAfterNextPageLoad (){
    if(this.userID !== '') {
      for (let i = 0; i < this.userFavorites.data.length; i++) {
        this.users_favorite_event_ids.push(this.userFavorites.data[i].id)
        this.users_favorite_event_id_and_fav_id.push({event_id: this.userFavorites.data[i].id, fav_id: this.userFavorites.data[i].fav_id })
        this.users_favorite_event_id_and_visibilty.push({event_id: this.userFavorites.data[i].id, visibility: this.hasBeenAddedToFavorites(this.userFavorites.data[i].id) })
      }
    }
  }


  openModal(url: string) {
    this.modalRef = this.modalService.open(SocialShareModalComponent, { data: { url: url }});
  }

}
