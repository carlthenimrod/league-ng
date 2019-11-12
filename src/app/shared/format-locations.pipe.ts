import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '@app/models/place';

@Pipe({
  name: 'formatLocations'
})
export class FormatLocationsPipe implements PipeTransform {

  transform(locations: Location[]): string {
    let string = '';

    string += '(';
      for (let i = 0; i < locations.length; i++) {
        const location = locations[i];
        if (i > 0) { string += ', '; }
        string += location.name;
      }
    string += ')';

    return string;
  }
}
