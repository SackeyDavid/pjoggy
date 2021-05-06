import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { UsersFavoritesService } from 'src/app/services/users-favorites/users-favorites.service';
import moment from 'moment';
import { OwlCarousel } from 'ngx-owl-carousel';
import { Router } from '@angular/router';
import { HappeningNowService } from 'src/app/services/happening-now/happening-now.service';

declare var $: any;

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, AfterViewChecked {

  categories: any;
  allEvents: any;
  categoryEvents: any[] = [];
  slideConfig: any;

  // eventsToday: any = []
  events_in_six_hrs: any = []
  events_events_in_six_hrs_empty: boolean = false
  popularEvents: any = []
  newEvents: any = []

  userFavorites: any = []
  userID: string = '';
  sliderOptions: any;
  
  users_favorite_event_ids: any = []

  loading: boolean = true;
  loadIndex = [5, 5, 5]

  favorites_loadIndex = 8

  
  users_favorite_event_id_and_fav_id: any = []

  @ViewChild('upcomingSlider') upcomingSlider: OwlCarousel | undefined;
  @ViewChild('popularSlider') popularSlider: OwlCarousel | undefined;
  @ViewChild('newSlider') newSlider: OwlCarousel | undefined;

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private userFavoriteService: UsersFavoritesService,
    private eventsHappeningNow: HappeningNowService,
    ) { 
      this.getEventsInSixHrs();
      this.getPopularEvents();
      this.getNewEvents();
      this.getAllEvents();
      this.getUsersFavorites();


      
      $(document).ready(function(){ 

      $(".save_live_event_div").on("mouseover", function(this: HTMLDivElement){
        alert('Hi')
        $(this).find('svg').get(0).style.setProperty('fill', 'rgba(255, 101, 80, 0.4)');
        // .css('fill','rgba(255, 101, 80, 0.4);');
        console.log($(this).find('svg'))
        });

      });


    }

  ngOnInit(): void {
    var user_id: any =  sessionStorage.getItem('x_auth_token')
    // user_id = JSON.parse(user_id)
    console.log(user_id)
    this.userID = user_id;
   
    this.getCategories();
    this.getUsersFavorites()  
    console.log(this.users_favorite_event_ids)  

    this.sliderOptions = {
      items: 5,
      margin: 15,
      dots: false,      
      responsive:{        
        450: { items:2 },
        600: { items:3 },
        900: { items:5 }
      }
    };
  }

  ngAfterViewChecked() {
    try {
      // this.getUsersFavorites()
      
    } catch (error) {
      
    }
  }

  toCamelCase(sentenceCase: any) {
    var out = "";
    sentenceCase.split(" ").forEach(function (el: any, idx: any) {
        var add = el.toLowerCase();
        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    // TODO: leak
    // console.log(out);
    return out;
  }

  formatTabPaneId(category: any){
    let camelCase = this.toCamelCase(category);
    let id = '#' + camelCase;
    // console.log(id);
    return id;
  }

  upcomingSliderNext(){
    this.upcomingSlider?.trigger('next.owl.carousel');
  }

  upcomingSliderPrev(){
    this.upcomingSlider?.trigger('prev.owl.carousel');
  }

  popularSliderNext(){
    this.popularSlider?.trigger('next.owl.carousel');
  }

  popularSliderPrev(){
    this.popularSlider?.trigger('prev.owl.carousel');
  }

  newSliderNext(){
    this.newSlider?.trigger('next.owl.carousel');
  }

  newSliderPrev(){
    this.newSlider?.trigger('prev.owl.carousel');
  }

  gotoPreview(eventId: any) {
    sessionStorage.setItem('preview_event_id', eventId);
    this.router.navigateByUrl('/event_details');
  }
  
  getAllEvents(): void {
    this.eventsService.getAllEvents().then(
      res => {
        console.log(res);
        this.allEvents = res.events.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getCategories(): void {
    this.eventsService.getCategories().then(
      res => {
        console.log(res);
        this.categories = res.categories;

        this.getCategoryEvents();
      },
      err => {
        console.log(err);
      }
    );
  }

  getCategoryEvents(): void {
    for(let i=0; i<this.categories.length; i++) {
      var categoryId = this.categories[i].id;
      this.eventsService.getCategoryEvents(categoryId).then(
        res => {
          console.log(res);
          this.categoryEvents[i] = res.event.data;
          this.loadIndex[i] = 5
          console.log(this.categoryEvents[i])
        },
        err => {
          console.log(err);
        }
      );
    }

    console.log(this.categoryEvents, this.loadIndex)
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


  getEventsInSixHrs(): void {
    this.eventsService.getEventsInSixHours().then(
      res => {
        console.log(res);
        this.events_in_six_hrs = res.events.data;
        this.events_events_in_six_hrs_empty = ((this.events_in_six_hrs.length > 0)? false: true)
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

  getPopularEvents(): void {
    this.eventsService.getPopularEvents().then(
      res => {
        console.log(res);
        this.popularEvents = res.event.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getNewEvents(): void {
    this.eventsService.getNewEvents().then(
      res => {
        console.log(res);
        this.newEvents = res.events.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  saveEventAsFavorite(event_id: any): void {
    if(this.userID == null) {
      this.router.navigateByUrl('/login')
      
    } else {
      
      document.getElementById('favorite-'+event_id)?.style.setProperty('fill', 'rgba(255, 101, 80, 0.4)');
      
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

  
  loadMore(categoryId: any) {

    this.loading = true
    if(this.loadIndex[categoryId] < this.categoryEvents[categoryId].length) {
      this.loadIndex[categoryId] += 5
    }
    
    this.loading = false
  }

  loadLess(categoryId: any) {
    this.loading = true
    if(this.loadIndex[categoryId] >= this.categoryEvents[categoryId].length) {
      this.loadIndex[categoryId] -= 5
    }
    
    this.loading = false
  }

  loadMoreFavorites() {

    this.loading = true
    if(this.favorites_loadIndex < this.userFavorites.length) {
      this.favorites_loadIndex += 5
    }
    
    this.loading = false
  }

  loadLessFavorites() {
    this.loading = true
    if(this.favorites_loadIndex >= this.userFavorites.length) {
      this.favorites_loadIndex = 8
    }
    
    this.loading = false
  }



}
