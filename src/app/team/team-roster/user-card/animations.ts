import { trigger, state, style, transition, animate, query, animateChild, group } from '@angular/animations';

export const lightboxTrigger = trigger('lightbox', [
  state('mobile', style({
    background: 'rgba(0, 0, 0, 0.85)'
  })),
  transition('void => mobile', [
    style({
      background: 'none'
    }),
    group([
      animate('50ms ease-in'),
      query('@usercard', animateChild())
    ])
  ])
]);

export const usercardTrigger = trigger('usercard', [
  state('mobile', style({
    bottom: '0'
  })),
  transition('void => mobile', [
    style({
      bottom: '-65%'
    }),
    animate('200ms ease-out')
  ])
]);