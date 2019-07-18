import { trigger, style, transition, animate, animateChild, query, group } from '@angular/animations';

export const lightboxTrigger = trigger('lightbox', [
  transition(':enter', [
    style({ backgroundColor: 'transparent' }),
    group([
      animate('50ms ease-in', style({
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      })),
      query('@inviteForm', animateChild())
    ]),
    query('@userInvite', 
      animateChild(), 
      { optional: true }
    )
  ])
]);

export const inviteFormTrigger = trigger('inviteForm', [
  transition(':enter', [
    style({ top: '-8.5rem' }),
    animate('150ms ease-out', style({
      top: 0
    }))
  ])
]);

export const userInviteTrigger = trigger('userInvite', [
  transition(':enter', [
    style({ top: 'calc(100% - 8.5rem)' }),
    animate('150ms ease-in', style({
      top: 0
    }))
  ])
]);