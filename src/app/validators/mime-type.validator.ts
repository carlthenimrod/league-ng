import { AbstractControl } from '@angular/forms';
import { Observable, of, Observer } from 'rxjs';

export const mimeType = (control: AbstractControl)
: Observable<{ [key: string]: any }> => {
  if (typeof control.value === 'string') { return of(null); }

  const file = control.value as File;
  const fr = new FileReader();

  return Observable.create((obs: Observer<{ [key: string]: any }>) => {
    fr.addEventListener('loadend', () => {
      const arr = new Uint8Array(<ArrayBuffer>fr.result).subarray(0, 4);
      let header = '';
      let isValid = false;

      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }

      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }

      if (isValid) {
        obs.next(null);
      } else {
        obs.next({ invalidMimeType: true });
      }

      obs.complete();
    });
    fr.readAsArrayBuffer(file);
  });
};
