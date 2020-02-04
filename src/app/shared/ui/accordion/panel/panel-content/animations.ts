import { trigger, transition, style, animate } from '@angular/animations';

export const panelTrigger = trigger('panel', [
  transition(':enter', [
    style({
      height: 0,
      opacity: 0
    }),
    animate('50000ms ease-in', style({
      height: '*'
    })),
    animate('50000ms ease-in', style({
      opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('50000ms ease-out', style({
      opacity: 1
    })),
    animate('50000ms ease-out', style({
      height: 0
    }))
  ])
]);
