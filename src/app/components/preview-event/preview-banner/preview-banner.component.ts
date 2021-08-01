import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-preview-banner',
  templateUrl: './preview-banner.component.html',
  styleUrls: ['./preview-banner.component.scss']
})
export class PreviewBannerComponent implements OnInit, OnDestroy {

  @Input() eventContent: any = [];
  
  private subscription: Subscription | undefined;

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;
  
  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;

  
  userID: string = '';
  user_token: any;
  
  constructor() { }

  ngOnInit(): void {    
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });

    var user_token = sessionStorage.getItem('x_auth_token')
    this.user_token = ((user_token !== null? user_token: ''))
    var user_id: any =  sessionStorage.getItem('user_id')
    // user_id = JSON.parse(user_id)
    // console.log(user_token)
    this.userID = user_id;
    
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private getTimeDifference () {
    let dateNow = new Date();
    let dDay = new Date(this.eventContent.start_date_time);

    this.timeDifference = dDay.getTime() - dateNow.getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  
  getEventDateWithoutTime(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  getEventEndDateFormatted(date: any) {
    return moment(date).format('h:mm A');

  }
  
  getEventStartDateFormatted(date: any) {
    return moment(date).format('ddd, MMM D, YYYY h:mm A');
  }

}
