import { trigger, transition, style, animate } from '@angular/animations';

export const noticeToggleTrigger = trigger('noticeToggle', [
  transition(':enter', [
    style({
      transform: 'scale(0)'
    }),
    animate('100ms ease-out', style({
      transform: 'scale(1)'
    }))
  ]),
  transition(':leave', [
    animate('100ms ease-in', style({
      transform: 'scale(0)'
    }))
  ]),
  transition('* <=> *', [
    animate('50ms ease-out', style({
      transform: 'scale(0.9)'
    })),
    animate('100ms ease-in', style({
      transform: 'scale(1.1)'
    })),
    animate('50ms ease-out', style({
      transform: 'scale(1)'
    }))
  ])
]);
