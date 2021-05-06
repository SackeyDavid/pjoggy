import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HappeningNowService } from 'src/app/services/happening-now/happening-now.service';
import { EventsService } from 'src/app/services/events/events.service';

declare var $: any;

@Component({
  selector: 'app-live-events-page',
  templateUrl: './live-events-page.component.html',
  styleUrls: ['./live-events-page.component.scss']
})
export class LiveEventsPageComponent implements OnInit, AfterViewChecked {
  thumbsSliderOptions: any;

  

  loading: boolean = false
  
  loadIndex = 20
  eventsNow: any;

  watched_videos:any = []
  _x = this;

  constructor(
    private eventsHappeningNow: HappeningNowService,
    private eventService: EventsService
  ) { 
      
      $(document).ready(function(){
        // $('.slider').slick({
        //   infinite: true,
        //   slidesToShow: 5,
        //   slidesToScroll: 5,
        //   nextArrow: $('.next'),
        //   prevArrow: $('.prev'),
        //   initialSlide: 1,
        //   mobileFirst: true,
        //   row: 1,
        //   slidesPerRow: 5,
        // });

       
      });

      
  }

  ngOnInit(): void {
    // this.getEventsHappeningNow()
    this.eventsNow =  [];
    this.loadIndex = 5
    
    // for (let i = 0; i < 20; i++) {
    //   // const element = array[i];
    //   this.eventsNow.push(this.event)
      
    // }

    this.eventService.getEventsHappeningNow().then(
      res => {
        console.log(res);
        this.eventsNow = res.event.data;
      },
      err => {
        console.log(err);
      }
    );
    
    
    

    this.thumbsSliderOptions = {
      items: 1,
    };
  }

  ngAfterViewChecked() {
    try {
      if(this.eventsNow?.length) {

        var _x = this
        $(".live_event_presentation_div").on("mouseover", function(this: HTMLDivElement) {
          
          $(this).find('video').get(0).style.setProperty('display', 'block')
  
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
      
        });
        

      }
      
    } catch (error) {
      
    }
  }


 
  getEventsHappeningNow(): void {
    this.eventsHappeningNow.getEventsHappeningNow().then(
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
    document.getElementById('video-pause-'+video_id)?.style.setProperty('display', 'none')
    
    $('#video-'+video_id).get(0).pause()
    this.watched_videos.push($('#video-'+video_id).get(0).id)
    


    // show play control
    document.getElementById('video-play-'+video_id)?.style.setProperty('display', 'block')
   
  }

  playVideo(video_id: any) {
    // hide play control
    console.log(video_id)
    document.getElementById('video-play-'+video_id)?.style.setProperty('display', 'none')
    
    $('#video-'+video_id).get(0).play()
    this.watched_videos = $.grep(this._x.watched_videos, function(value: any) {
      return value != $('#video-'+video_id).get(0).id;
    });
  console.log(this.watched_videos)
    // show pause control
    document.getElementById('video-pause-'+video_id)?.style.setProperty('display', 'block')
    
  }

  loadMore() {
    this.loading = true
    if(this.loadIndex < this.eventsNow.length) {
      this.loadIndex += 5
    }
    
    this.loading = false
  }

  loadLess() {
    this.loading = true
    if(this.loadIndex > 5) {
      this.loadIndex -= 5
    }
    
    this.loading = false
  }

}




























// event: any = {
//   "id": 18,
//   "user_id": 20,
//   "created_by": "Kofi Ahen",
//   "rating": "3.9",
//   "title": "How to Master Your Money Mindset in 2021: The Art of Saving",
//   "status": "Published",
//   "description": "Have you ever wondered why you think about or deal with money the way you do? Ever get the feeling that your thinking and psychology sometimes push you to make choices that aren’t really the best for you? Do you want to change things up but not sure where to start?",
//   "venue": "AH Hotel and conference",
//   "gps": "5.65255,-0.15018",
//   "event_url": "http://127.0.0.1:8000/api/view_event/%242y%2410%246UskjmNNdhwpPODzrrj1..j2B3fVVqTkcXjiTOQ8C/glhtswTPnLW?signature=9e5cf956e8509cc6d5f8d5acde08384bc637e77bddf8d13c4dc0242143cdd1e9",
//   "contact_email": "warihana123@gmail.com",
//   "contact_phone": "233501879144",
//   "start_date_time": "2021-03-17 12:00:00",
//   "end_date_time": "2021-03-17 18:00:00",
//   "recurring": "No",
//   "drop_in": "No",
//   "type": "Public",
//   "Category": "Corporate Events",
//   "sub_category": "Trade Shows",
//   "tags": "conference,seminars,event,money,savings",
//   "ticketing": "Free",
//   "currency": "$",
//   "price": 0,
//   "ticket_sales_end_date": "2021-03-14 06:00:00",
//   "banner_image": "phpFAD6.tmp_2021-02-23 17_12_49.jpg",
//   "hosting": "Physical",
//   "hosted_on_link": null,
//   "created_at": "2021-02-23 17:12:49",
//   "updated_at": null
// }