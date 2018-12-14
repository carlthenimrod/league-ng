import { trigger, transition, style, animate } from '@angular/animations';

export const notificationToggleTrigger = trigger('notificationToggle', [
  transition(':enter', [
    style({
      transform: 'scale(0)'
    }),
    animate(100, style({
      transform: 'scale(1)'
    }))
  ]),
  transition(':leave', [
    animate(100, style({
      transform: 'scale(0)'
    }))
  ]),
  transition('* <=> *', [
    animate(100, style({
      transform: 'scale(0.8)'
    })),
    animate(100, style({
      transform: 'scale(1.2)'
    })),
    animate(100, style({
      transform: 'scale(1)'
    }))
  ])
]);
