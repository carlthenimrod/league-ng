import { trigger, transition, style, animate, query } from '@angular/animations';

export const slotsEnterTrigger = trigger('slotsEnter', [
  transition(':enter', [
    style({
      height: 0,
      padding: 0
    }),
    query('header, article, p.no-slots', [
      style({
        opacity: 0
      })
    ], { optional: true }),
    animate('300ms ease-in', style({
      height: '*',
      padding: '*'
    })),
    query('header, article, p.no-slots', [
      animate('100ms ease-out', style({
        opacity: '*'
      }))
    ])
  ])
]);
