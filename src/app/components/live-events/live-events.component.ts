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

  constructor(
    private eventsHappeningNow: HappeningNowService,
    private eventService: EventsService,
    private userFavoriteService: UsersFavoritesService,
    private router: Router
  ) { 
      

      // $(document).ready(function(){        

        

      // });

      
  }

  ngAfterViewChecked() {
    try {
      if(this.eventsNow?.length) {
        $('.slider').slick({
          infinite: false,
          nextArrow: $('.next'),
          prevArrow: $('.prev'),
          // initialSlide: 0,
          // mobileFirst: true,
          speed: 300,
          slidesToShow: 5,
          slidesToScroll: 5,
          // row: 1,
          // variableWidth: false,
          // slidesPerRow: 5,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        });

        $(".slick-track").css('width', 'max-content !important');

        var _x = this 


        $(".live_event_presentation_div").on("mouseover", function(this: HTMLDivElement) {
          
          // alert('Here')
          $(this).find('video').get(0).style.setProperty('display', 'block')
          $(this).find('img').get(0).style.setProperty('display', 'none')
  
          if(_x.watched_videos.length > 0) {
            
            if(($.inArray($(this).find('video').get(0).id, _x.watched_videos)) == -1) {
                
                $(this).find('video').get(0).play()
  
            } else {
  
            }
            
          } else {
  
            $(this).find('video').get(0).play()
  
          }
          
          
        
      
        }).on('mouseout', function(this: HTMLDivElement) {
          $(this).find('video').get(0).pause()
          $(this).find('video').get(0).currentTime = 0;
          $(this).find('video').get(0).style.setProperty('display', 'none')
          $(this).find('img').get(0).style.setProperty('display', 'block')
      
        });
        
      }  
    } catch (error) {
      
    }
    
  }

  ngOnInit(): void {
    this.getTimeDiff('2021-06-16 08:00:49');
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
  }
 
  getEventsHappeningNow(): void {
    this.eventService.getEventsHappeningNow().then(
      res => {
        console.log(res);
        this.eventsNow = res.event.data;
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



  getUsersFavorites (){

    if(this.userID !== '') {
      this.userFavoriteService.getUserFavorites(this.userID).then(
        res => {
          console.log(res);
          this.userFavorites = res.event.data;
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
    // var datetime = typeof datetime !== 'undefined' ? datetime : "2021-01-01 01:02:03.123456";
    // console.log(datetime)
    datetime = new Date( datetime ).getTime();
    var now = new Date().getTime();

    if( isNaN(datetime) )
    {
        return "";
    }

    console.log( datetime + " " + now);

    if (datetime < now) {
        var milisec_diff = now - datetime;
    }else{
        var milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    var date_diff = new Date( milisec_diff );

    return days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
  }

}















    // used for sample happening now events

    // this.eventsToday = 

    // [
    //     {
    //       "id": 18,
    //       "user_id": 20,
    //       "created_by": "Kofi Ahen",
    //       "rating": "3.9",
    //       "title": "How to Master Your Money Mindset in 2021: The Art of Saving",
    //       "status": "Published",
    //       "description": "Have you ever wondered why you think about or deal with money the way you do? Ever get the feeling that your thinking and psychology sometimes push you to make choices that aren’t really the best for you? Do you want to change things up but not sure where to start?",
    //       "venue": "AH Hotel and conference",
    //       "gps": "5.65255,-0.15018",
    //       "event_url": "http://127.0.0.1:8000/api/view_event/%242y%2410%246UskjmNNdhwpPODzrrj1..j2B3fVVqTkcXjiTOQ8C/glhtswTPnLW?signature=9e5cf956e8509cc6d5f8d5acde08384bc637e77bddf8d13c4dc0242143cdd1e9",
    //       "contact_email": "warihana123@gmail.com",
    //       "contact_phone": "233501879144",
    //       "start_date_time": "2021-03-17 12:00:00",
    //       "end_date_time": "2021-03-17 18:00:00",
    //       "recurring": "No",
    //       "drop_in": "No",
    //       "type": "Public",
    //       "Category": "Corporate Events",
    //       "sub_category": "Trade Shows",
    //       "tags": "conference,seminars,event,money,savings",
    //       "ticketing": "Free",
    //       "currency": "$",
    //       "price": 0,
    //       "ticket_sales_end_date": "2021-03-14 06:00:00",
    //       "banner_image": "phpFAD6.tmp_2021-02-23 17_12_49.jpg",
    //       "hosting": "Physical",
    //       "hosted_on_link": null,
    //       "created_at": "2021-02-23 17:12:49",
    //       "updated_at": null
    //     },
    //    ]
