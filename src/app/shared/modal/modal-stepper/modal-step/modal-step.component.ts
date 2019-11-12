import { Component, ContentChild, AfterContentInit, Input, Output, EventEmitter, HostBinding, ElementRef, HostListener } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ModalStepNextDirective } from './modal-step-next.directive';
import { ModalStepPrevDirective } from './modal-step-prev.directive';
import { stepChangeTrigger } from './animations';

@Component({
  selector: 'app-modal-step',
  templateUrl: './modal-step.component.html',
  styleUrls: ['./modal-step.component.scss'],
  animations: [stepChangeTrigger]
})
export class ModalStepComponent implements AfterContentInit {
  @Input() stepControl: AbstractControl;
  @Output() prev = new EventEmitter<boolean>();
  @Output() next = new EventEmitter<boolean>();
  @ContentChild(ModalStepPrevDirective, { static: false }) stepPrev: ModalStepPrevDirective;
  @ContentChild(ModalStepNextDirective, { static: false }) stepNext: ModalStepNextDirective;
  @HostBinding('@stepChange') state;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(e: KeyboardEvent) {
    e.stopPropagation();

    console.log('test');
  }

  constructor(public el: ElementRef) { }

  ngAfterContentInit() {
    this.listenPrev();
    this.listenNext();
  }

  listenPrev() {
    if (!this.stepPrev) { return; }

    this.stepPrev.clicked.subscribe(() => this.prev.emit(true));
  }

  listenNext() {
    if (!this.stepNext) { return; }

    this.stepNext.clicked.subscribe(() => {
      if (!this.stepControl || this.stepControl.valid) {
        this.next.emit(true);
      }
    });
  }
}
