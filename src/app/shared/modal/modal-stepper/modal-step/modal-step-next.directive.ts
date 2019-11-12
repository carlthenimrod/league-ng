import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appModalStepNext]'
})
export class ModalStepNextDirective {
  @Output() clicked = new EventEmitter<boolean>();

  @HostListener('click', ['$event']) click(e: Event) {
    e.preventDefault();

    this.clicked.emit(true);
  }

  constructor() {}
}
