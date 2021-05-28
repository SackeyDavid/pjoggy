import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatetimeFormatterService {

  constructor() { }

  /**
   * formats date and time from ngx bootstrap picker
   * @param _date date object vlaue
   * @param _time time object value
   * @returns combined datetime
   */
  formatDateTime(_date: any, _time: any): string {
    // let f_date = _date.year + '-' + _date.month + '-' + _date.day;
    // let f_time = _time.hour + ':' + _time.minute + ':' + _time.second;

    // return f_date + ' ' + f_time;
    let f_date = moment(_date).format('YYYY-MM-DD');
    let f_time = moment(_time).format('hh:mm:ss');

    return f_date + ' ' + f_time;
  }

  /**
   * formats date from ngx bootstrap picker
   * @param _date date object vlaue
   * @param _time time object value
   * @returns combined datetime
   */
   formatDate(_date: any): string {
    let f_date = moment(_date).format('YYYY-MM-DD');

    return f_date;
  }

}
