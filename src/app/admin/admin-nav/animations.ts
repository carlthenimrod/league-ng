import { trigger, transition, state, style, animate, query, stagger } from '@angular/animations';

export const slideNavTrigger = trigger('slideNav', [
  state('open', style({
    transform: 'translateX(0%)'
  })),
  state('closed', style({
    opacity: 0,
    transform: 'translateX(100%)'
  })),
  transition('closed => open', [
    query('a', [
      style({ opacity: 0 })
    ]),
    animate(100),
    query('a', [
      stagger(50, [
        animate(100, style({ opacity: 1 }))
      ])
    ])
  ]),
  transition('open => closed', [
    animate(50, style({
      opacity: 0
    }))
  ])
]);
