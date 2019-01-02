import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const gameListEnterTrigger = trigger('gameListEnter', [
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
      stagger('100ms', [
        animate('200ms ease-out', style({
          opacity: '*',
          transform: 'scale(1)'
        }))
      ])
    ], { optional: true })
  ])
]);

export const gameToggleTrigger = trigger('gameToggle', [
  transition(':enter', [
    style({
      transform: 'scale(4) rotate(180deg)'
    }),
    animate('400ms ease-out')
  ])
]);
