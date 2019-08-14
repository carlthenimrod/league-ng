import { trigger, transition, animate, style, state } from '@angular/animations';

export const navToggleTrigger = trigger('navToggle', [
  state('mobileOpen', style({ left: 'calc(100% - 3rem)' })),
  transition('mobileClose => mobileOpen', [
    animate('200ms ease-in', style({
      left: 'calc(100% - 3rem)'
    }))
  ]),
  transition('mobileOpen => mobileClose', [
    animate('200ms ease-in', style({
      left: '-1px'
    }))
  ]),
]);