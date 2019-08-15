import { trigger, transition, state, style, animate } from '@angular/animations';

export const navMenuTrigger = trigger('navMenu', [
  state('mobileClose', style({ display: 'none '})),
  state('mobileOpen', style({ display: 'block' })),
  transition('mobileOpen => mobileClose', animate(200))
]);