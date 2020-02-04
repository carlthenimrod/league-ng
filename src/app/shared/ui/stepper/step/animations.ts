import { trigger, state, style, transition, animate } from '@angular/animations';

export const transitionTrigger = trigger('transition', [
  state('active', style({ display: 'block' })),
  transition('active => prev',
    animate('200ms ease-in-out', style({
      marginLeft: '-100%'
    }))
  ),
  transition('prev => active', [
    style({
      display: 'block',
      marginLeft: '-100%'
    }),
    animate('200ms ease-in-out', style({
      marginLeft: '0'
    }))
  ]),
  transition('active => next', animate('200ms ease-in-out'))
]);
