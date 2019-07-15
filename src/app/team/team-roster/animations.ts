import { trigger, state, style, transition, animate, query } from '@angular/animations';

export const sidebarSlideTrigger = trigger('sidebarSlide', [
  state('desktopClose', style({
    left: 'auto'
  })),
  state('desktopOpen', style({
    left: 'auto'
  })),
  state('mobileClose', style({
    left: 'calc(100% + 3.5rem)'
  })),
  state('mobileOpen', style({
    left: '3.5rem'
  })),
  transition('mobileOpen => mobileClose', [
    query('aside#roster', style({
      display: 'block'
    })),
    animate('150ms ease-in')
  ]),
  transition('mobileClose => mobileOpen', animate('150ms ease-in'))
]);