import { trigger, state, style, transition, animate } from '@angular/animations';

export const dashboardSlideTrigger = trigger('dashboardSlide', [
  state('desktopClose', style({
    left: 'auto'
  })),
  state('desktopOpen', style({
    left: 'auto'
  })),
  state('mobileClose', style({
    left: '0'
  })),
  state('mobileOpen', style({
    left: 'calc((100% - 3.5rem) * -1)'
  })),
  transition('mobileOpen => mobileClose', animate('150ms ease-in')),
  transition('mobileClose => mobileOpen', animate('150ms ease-in'))
]);