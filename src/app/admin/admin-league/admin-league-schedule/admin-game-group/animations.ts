import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const gameListToggleTrigger = trigger('gameListToggle', [
  transition(':enter', [
    style({
      height: 0,
      padding: 0
    }),
    query('article', [
      style({
        opacity: 0,
        transform: 'scale(1.2)'
      })
    ], { optional: true }),
    animate('200ms ease-in', style({
      height: '*',
      padding: '*'
    })),
    query('article', [
      stagger('200ms', [
        animate('200ms ease-out', style({
          opacity: '*',
          transform: 'scale(1)'
        }))
      ])
    ], { optional: true })
  ]),
  transition(':leave', [
    animate('100ms', style({
      height: 0,
      padding: 0
    }))
  ])
]);
