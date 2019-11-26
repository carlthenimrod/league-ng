import { Pipe, PipeTransform } from '@angular/core';

import { Place } from '@app/models/place';

@Pipe({
  name: 'gmapLink'
})
export class GmapLinkPipe implements PipeTransform {

  transform(place: Place): string {
    let url = 'https://www.google.com/maps/search/?api=1&query=';

    if (place.label) {
      const label = place.label.toLowerCase().split(' ').join('+');
      url += label;
    }

    if (place.address.street) {
      const street = place.address.street.toLowerCase().split(' ').join('+');
      url = this.addPlus(url);
      url += street;
    }

    if (place.address.state) {
      const state = place.address.state.toLowerCase().split(' ').join('+');
      url = this.addPlus(url);
      url += state;
    }

    if (place.address.city) {
      const city = place.address.city.toLowerCase().split(' ').join('+');
      url = this.addPlus(url);
      url += city;
    }

    if (place.address.postal) {
      const postal = place.address.postal.toLowerCase().split(' ').join('+');
      url = this.addPlus(url);
      url += postal;
    }

    return url;
  }

  addPlus(url: string): string {
    if (url[url.length - 1 ] !== '+') { url += '+'; }

    return url;
  }
}
