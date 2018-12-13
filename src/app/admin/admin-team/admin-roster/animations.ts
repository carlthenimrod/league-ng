import { trigger, transition, style, animate, query } from '@angular/animations';

export const usersEnterTrigger = trigger('usersEnter', [
  transition(':enter', [
    query('.user', [
      style({
        height: 0,
        opacity: 0
      })
    ], { optional: true }),
    style({
      height: 0,
      opacity: 0
    }),
    animate(100, style({
      height: '*'
    })),
    animate(100),
    query('.user', [
      style({
        opacity: 0
      }),
      animate(100)
    ], { optional: true })
  ])
]);

export const userEnterTrigger = trigger('userEnter', [
  transition(':enter', [
    style({
      height: 0,
      opacity: 0
    }),
    animate(100, style({
      height: '*'
    })),
    animate(100)
  ])
]);
