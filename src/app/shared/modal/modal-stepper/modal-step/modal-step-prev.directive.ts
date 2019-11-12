import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appModalStepPrev]'
})
export class ModalStepPrevDirective {
  @Output() clicked = new EventEmitter<boolean>();

  @HostListener('click', ['$event']) click(e: Event) {
    e.preventDefault();

    this.clicked.emit(true);
  }

  constructor() {}
}
