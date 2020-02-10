import { trigger, transition, style, animate } from '@angular/animations';

export const unreadNotificationsTrigger = trigger('unreadNotifications', [
  transition(':enter', [
    style({ transform: 'scale(0)' }),
    animate('200ms ease-in', style({
      transform: 'scale(1.25)'
    })),
    animate('100ms ease-out', style({
      transform: 'scale(1)'
    }))
  ]),
  transition(':leave',
    animate('100ms ease-in', style({
      transform: 'scale(0)'
    }))
  )
]);
