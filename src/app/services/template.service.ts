import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  ctn: ElementRef;

  constructor() {}

  setContainer(ctn: ElementRef) {
    this.ctn = ctn;
  }

  scrollCtnUp() {
    if (!this.ctn) { return; }
    (<HTMLElement>this.ctn.nativeElement).scrollTop = 0;
  }
}
