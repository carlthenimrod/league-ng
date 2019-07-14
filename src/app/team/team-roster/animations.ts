import { trigger, state, style, transition, animate, query } from '@angular/animations';

export const sidebarSlideTrigger = trigger('sidebarSlide', [
  state('desktopClose', style({
    transform: 'none'
  })),
  state('desktopOpen', style({
    transform: 'none'
  })),
  state('mobileClose', style({
    transform: 'translateX(calc(100% + 3.5rem))'
  })),
  state('mobileOpen', style({
    transform: 'translateX(3.5rem)'
  })),
  transition('mobileOpen => mobileClose', [
    query('aside#roster', style({
      display: 'block'
    })),
    animate('150ms ease-in')
  ]),
  transition('mobileClose => mobileOpen', animate('150ms ease-in'))
]);