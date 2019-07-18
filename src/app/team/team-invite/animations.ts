import { trigger, style, transition, animate, animateChild, query, group } from '@angular/animations';

export const lightboxTrigger = trigger('lightbox', [
  transition(':enter', [
    style({ backgroundColor: 'transparent' }),
    group([
      animate('50ms ease-in', style({
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      })),
      query('@inviteForm', animateChild())
    ])
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