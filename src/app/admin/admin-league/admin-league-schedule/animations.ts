import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

export const groupsEnterTrigger = trigger('groupsEnter', [
  transition('* => *', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(200px) scale(1.20)'
      }),
      stagger('100ms ease-out', [
        animate('400ms ease-out')
      ])
    ], { optional: true })
  ])
]);

