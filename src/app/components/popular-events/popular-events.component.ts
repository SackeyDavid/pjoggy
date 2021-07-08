import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { OwlCarousel } from 'ngx-owl-carousel';
import { UsersFavoritesService } from 'src/app/services/users-favorites/users-favorites.service';
import moment from 'moment';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SocialShareModalComponent } from 'src/app/components/social-share-modal/social-share-modal.component';


@Component({
  selector: 'app-popular-events',
  templateUrl: './popular-events.component.html',
  styleUrls: ['./popular-events.component.scss']
})
export class PopularEventsComponent implements OnInit {

  events_in_six_hrs: any = []
  popularEvents:any = []
  
  userFavorites: any = []
  userID: string = '';
  sliderOptions: any;
  
  users_favorite_event_ids: any = []  
  users_favorite_event_id_and_fav_id: any = []
  
  @ViewChild('upcomingSlider') upcomingSlider: OwlCarousel | undefined;

  loading: boolean = false
  
  loadIndex = 20
  
  modalRef: any;

  constructor(
    private eventsService: EventsService,
    private userFavoriteService: UsersFavoritesService,
    private router: Router,
    private modalService: MdbModalService
  ) { 
    this.getPopularEvents();
  }

  ngOnInit(): void {
    var user_id: any =  sessionStorage.getItem('user_id')
    console.log(user_id)
    this.userID = user_id;
    
    this.getUsersFavorites()  
    console.log(this.users_favorite_event_ids) 

    this.loadIndex = 5 

    // this.sliderOptions = {
    //   items: 5,
    //   margin: 15,
    //   dots: false,      
    //   responsive:{        
    //     450: { items:2 },
    //     600: { items:3 },
    //     900: { items:5 }
    //   }
    // };
  }

  
  upcomingSliderNext(){
    this.upcomingSlider?.trigger('next.owl.carousel');
  }

  upcomingSliderPrev(){
    this.upcomingSlider?.trigger('prev.owl.carousel');
  }

  
  getEventsInSixHrs(): void {
    this.eventsService.getEventsInSixHours().then(
      res => {
        console.log(res);
        this.events_in_six_hrs = res.events.data;
        this.events_in_six_hrs.sort(function(a: any, b:any){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.start_date_time).valueOf() - new Date(b.start_date_time).valueOf();
        });

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
      
    } else {

      this.userFavoriteService.addFavoriteEvent(event_id, this.userID).then(
        res => {
          if (res) {
            console.log(res);
  
            
          }
          else {
            console.log('didnt add to favorites');
          }
        },
        err => {
          console.log(err);
          // this.isLoading = false;
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
          if (res) {
            console.log(res); 
            
          }
          else {
            console.log('didnt remove to favorites');
          }
        },
        err => {
          console.log(err);
          // this.isLoading = false;
        }
      );
    
  }

  
  loadMore() {
    this.loading = true
    if(this.loadIndex < this.events_in_six_hrs.length) {
      this.loadIndex += 5
    }
    
    this.loading = false
  }

  getPopularEvents(): void {
    this.eventsService.getPopularEvents().then(
      res => {
        console.log(res);
        this.popularEvents = res.events;
      },
      err => {
        console.log(err);
      }
    );
  }

  getPopularEventsPage(url: string): void {
    this.eventsService.getPopularEventsPage(url).then(
      res => {
        console.log(res);
        this.popularEvents = res.events;
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

  
  openModal(url: string) {
    this.modalRef = this.modalService.open(SocialShareModalComponent, { data: { url: url }});
  }

}
