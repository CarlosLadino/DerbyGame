import { Pipe, PipeTransform } from '@angular/core';
import { VwEventRaceGuests } from './Models/eventRaceGuest.model';

@Pipe({
  name: 'callBack',
  pure: false
})
export class CallbackPipe implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => callback(item));
  }
}
