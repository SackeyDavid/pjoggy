import { Injectable } from '@angular/core';

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
    let f_date = _date.year + '-' + _date.month + '-' + _date.day;
    let f_time = _time.hour + ':' + _time.minute + ':' + _time.second;

    return f_date + ' ' + f_time;
  }

}
