import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger } from '@angular/animations';

export const teamStaggerTrigger = trigger('teamStagger', [
  transition(':enter', [
    query('li', [
      style({
        height: 0,
        opacity: 0,
        transform: 'scale(0.5)'
      }),
      stagger('50ms', [
        animate('200ms ease-out', style({
          height: '*'
        })),
        animate('100ms ease-out')
      ])
    ], { optional: true })
  ])
]);

export const teamToggleTrigger = trigger('teamToggle', [
  transition(':enter', [
    style({
      height: 0,
      opacity: 0,
      transform: 'scale(0.5)'
    }),
    animate('200ms ease-out', style({
      height: '*'
    })),
    animate('100ms ease-out')
  ]),
  transition(':leave', [
    style({
      height: '*',
      opacity: 1,
      transform: 'scale(1)'
    }),
    animate('100ms linear', style({
      opacity: 0
    })),
    animate('100ms ease-in', style({
      height: 0
    }))
  ])
]);
