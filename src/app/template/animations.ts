import { trigger, transition, animate, style, state, query, group } from '@angular/animations';

export const navToggleTrigger = trigger('navToggle', [
  state('mobileOpen', style({ left: 'calc(100% - 3rem - 2px)' })),
  transition('mobileClose => mobileOpen', [
    query('app-header', style({ left: '0' })),
    group([
      animate('100ms ease-in', style({
        left: 'calc(100% - 3rem - 2px)'
      })),
      query('app-header', animate('100ms ease-in', style({
        left: 'calc(100% - 3rem)'
      })))
    ])
  ]),
  transition('mobileOpen => mobileClose', [
    query('app-header', style({ left: 'calc(100% - 3rem)' })),
    group([
      animate('100ms ease-in', style({
        left: '-2px'
      })),
      query('app-header', animate('100ms ease-in', style({
        left: '0'
      })))
    ])
  ])
]);