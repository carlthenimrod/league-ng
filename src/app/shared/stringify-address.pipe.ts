import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '@app/models/address';

@Pipe({
  name: 'stringifyAddress'
})
export class StringifyAddressPipe implements PipeTransform {
  transform(address: Address, partsString?: string): string {
    let string = '';

    if (partsString) {
      const parts = this.getParts(partsString);
      string = parts.includes('street') ? this.addStreet(address, string) : string;
      string = parts.includes('city') ? this.addCity(address, string) : string;
      string = ['city', 'state'].every(val => parts.includes(val)) ? this.addComma(address, string) : string;
      string = parts.includes('state') ? this.addState(address, string) : string;
      string = parts.includes('postal') ? this.addPostal(address, string) : string;
    } else {
      string = this.addStreet(address, string);
      string = this.addCity(address, string);
      string = this.addComma(address, string);
      string = this.addState(address, string);
      string = this.addPostal(address, string);
    }

    return string;
  }

  private addStreet(address: Address, string: string): string {
    return address.street ? string += address.street : string;
  }

  private addCity(address: Address, string: string): string {
    if (address.city) {
      return string.length > 0 ? string += '\n ' + address.city : address.city;
    } else {
      return string;
    }
  }

  private addComma(address: Address, string: string): string {
    return address.city && address.state ? string + ', ' : string;
  }

  private addState(address: Address, string: string): string {
    if (address.state) {
      return string.length > 0 ? string += ' ' + address.state : address.state;
    } else {
      return string;
    }
  }

  private addPostal(address: Address, string: string): string {
    if (address.postal) {
      return string.length > 0 ? string += ' ' + address.postal : address.postal;
    } else {
      return string;
    }
  }

  private getParts(parts: string): string[] {
    return parts.split(',').map(s => s.trim());
  }
}
