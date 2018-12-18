import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class SearchService {
  constructor() {
  }

  setDefaultRange(range?: number): string {
    range = range ? range : 7;
    const oneDayBeforeToday = new Date().valueOf() - 24 * 60 * 60 * 1000;
    const sevenDaysBeforeToday = oneDayBeforeToday - 24 * 60 * 60 * 1000 * range;
    const startDate = moment(sevenDaysBeforeToday).format('YYYY-MM-DD');
    const endDate = moment(oneDayBeforeToday).format('YYYY-MM-DD');
    return `${startDate} 至 ${endDate}`;
  }

  getStartAndEnd(range: string): { start: number, end: number } {
    const startDate = range.split('至')[0];
    const endDate = range.split('至')[1];
    const start = new Date(`${startDate} 00:00`);
    const end = new Date(`${endDate} 24:00`);
    return {
      start: start.valueOf(),
      end: end.valueOf()
    }
  }

  setDefaultDate() {
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    return currentDate;
  }
}
