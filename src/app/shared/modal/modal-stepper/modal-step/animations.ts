import { trigger, state, style, transition, animate } from '@angular/animations';

export const stepChangeTrigger = trigger('stepChange', [
  state('prev', style({
    marginLeft: '-100%'
  })),
  state('active', style({
    display: 'flex'
  })),
  transition('active => prev', animate('200ms ease-in-out')),
  transition('prev => active', [
    style({ display: 'flex'}),
    animate('200ms ease-in-out')
  ]),
  transition('active => next', animate('200ms ease-in-out'))
]);
