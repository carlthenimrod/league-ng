import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '@app/models/address';

@Pipe({
  name: 'hasAddress'
})
export class HasAddressPipe implements PipeTransform {
  transform(address: Address): boolean {
    return (address.street || address.city || address.state || address.postal)
     ? true
     : false;
  }
}
