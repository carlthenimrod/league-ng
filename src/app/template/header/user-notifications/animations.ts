import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const userNotificationsTrigger = trigger('userNotifications', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    query('article, p', style({ opacity: 0, transform: 'scale(0.8)' }), { optional: true }),
    animate('200ms ease-in', style({ transform: 'translateY(0)' })),
    query('article, p', [
      stagger('200ms', [
        animate('200ms', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ], { optional: true })
  ])
]);
