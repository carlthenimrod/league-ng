import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeTrigger = trigger('fade', [
  state('prev', style({
    opacity: 0
  })),
  state('active', style({
    display: 'block',
    opacity: 1
  })),
  transition('prev <=> active', animate('1000ms ease-in-out'))
]);
