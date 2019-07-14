import { trigger, state, style, transition, animate } from '@angular/animations';

export const dashboardSlideTrigger = trigger('dashboardSlide', [
  state('desktopClose', style({
    transform: 'none'
  })),
  state('desktopOpen', style({
    transform: 'none'
  })),
  state('mobileClose', style({
    transform: 'translateX(0%)'
  })),
  state('mobileOpen', style({
    transform: 'translateX(calc((100% - 3.5rem) * -1))'
  })),
  transition('mobileOpen => mobileClose', animate('150ms ease-in')),
  transition('mobileClose => mobileOpen', animate('150ms ease-in'))
]);