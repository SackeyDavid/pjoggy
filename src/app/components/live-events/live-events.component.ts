import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HappeningNowService } from 'src/app/services/happening-now/happening-now.service';
import { EventsService } from 'src/app/services/events/events.service';
import { UsersFavoritesService } from 'src/app/services/users-favorites/users-favorites.service';
import { Router } from '@angular/router';

declare var $: any;
 
@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.scss']
})
export class LiveEventsComponent implements OnInit, AfterViewChecked {

  thumbsSliderOptions: any;
  
  eventsNow: any;

  watched_videos:any = [];
  _x = this;

  userID: string = '';
  user_token: string = '';
  
  userFavorites: any = [];
  users_favorite_event_ids: any = [];
  users_favorite_event_id_and_fav_id: any = [];

  sliderOptions: any;

  constructor(
    private eventsHappeningNow: HappeningNowService,
    private eventService: EventsService,
    private userFavoriteService: UsersFavoritesService,
    private router: Router
  ) { }

  ngAfterViewChecked() { 
  }

  ngOnInit(): void {
    console.log(this.getTimeDiff('2021-06-16 08:00:49'));
    this.getEventsHappeningNow()
    // using  http://events369.logitall.biz/api/get_events_by_type/1 for now, waiting for happening now api

    var user_token = sessionStorage.getItem('x_auth_token');
    this.user_token = ((user_token !== null? user_token: ''));
    var user_id: any =  sessionStorage.getItem('user_id');
    console.log('user id: ', user_id);
    this.userID = user_id;

    this.getUsersFavorites();
    console.log(this.users_favorite_event_ids);

    this.thumbsSliderOptions = {
      items: 1,
    };

    this.initCarousel();
  }

  initCarousel() {
    var screenSize = window.innerWidth;
    console.log(screenSize);

    var owlItems = 4;

    if(screenSize > 900) owlItems = 4;
    else if(screenSize < 750 && screenSize > 600) owlItems = 3;
    else if(screenSize < 600 && screenSize > 450) owlItems = 2;
    else if(screenSize < 450) owlItems = 1;

    this.sliderOptions = {
      items: owlItems,
      margin: 20,
      dots: false,      
      responsive:{        
        450: { items: 1 },
        600: { items: 2 },
        750: { items: 3 },
        900: { items: 4 }
      }
    };
  }
 
  getEventsHappeningNow(): void {
    this.eventService.getEventsHappeningNow().then(
      res => {
        console.log(res);
        this.eventsNow = res.events?.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  slidePrevsLiveStream() {
  }

  slideNextLiveStream() {
  }

  pauseVideo(video_id: any) {
    console.log(video_id)
    document.getElementById('video-pause-'+video_id)?.style.setProperty('display', 'none')
    
    $('#video-'+video_id).get(0).pause()
    this.watched_videos.push($('#video-'+video_id).get(0).id)

    // show play control
    document.getElementById('video-play-'+video_id)?.style.setProperty('display', 'block')   
  }

  playVideo(video_id: any) {
    // hide play control
    document.getElementById('video-play-'+video_id)?.style.setProperty('display', 'none')
    
    $('#video-'+video_id).get(0).play()
    this.watched_videos = $.grep(this._x.watched_videos, function(value: any) {
      return value != $('#video-'+video_id).get(0).id;
    });

    // show pause control
    document.getElementById('video-pause-'+video_id)?.style.setProperty('display', 'block')    
  }

  saveEventAsFavorite(event_id: any): void {
    if(this.user_token == null) {
      this.router.navigateByUrl('/login')      
    } 
    else {
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
    console.log(event_id);    
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



  getUsersFavorites (){
    if(this.userID !== '') {
      this.userFavoriteService.getUserFavorites(this.userID).then(
        res => {
          console.log(res);
          this.userFavorites = res.event?.data;
          for (let i = 0; i < this.userFavorites.length; i++) {
            this.users_favorite_event_ids.push(this.userFavorites[i].id)
            this.users_favorite_event_id_and_fav_id.push({event_id: this.userFavorites[i].id, fav_id: this.userFavorites[i].fav_id })          
          }
        },
        err => {
          console.log(err);
        }
      );

    }
  }

  hasBeenAddedToFavorites(event_id: any) {
    return this.users_favorite_event_ids.includes(event_id)
  }

  getTimeDiff(datetime: any ) {
  }

  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
