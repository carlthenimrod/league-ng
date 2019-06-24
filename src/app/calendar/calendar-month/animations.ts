import { trigger, state, style, transition, animate, keyframes, query, group } from '@angular/animations';

export const monthSlider = trigger('monthSlider', [
  state('previous', style({
    transform: 'translateX(-100%) scale(0.75) rotateY(-350deg)',
    zIndex: 2
  })),
  state('next', style({
    transform: 'translateX(0%) scale(0.75) rotateY(350deg)',
    zIndex: 2
  })),
  state('active', style({
    transform: 'translateX(-50%)',
    zIndex: 3
  })),
  transition(':enter', [
    style({
      opacity: 0,
      zIndex: 1
    }),
    animate('200ms ease-in')
  ]),
  transition(':leave', [
    style({
      zIndex: 1
    }),
    animate('200ms ease-out', style({
      opacity: 0
    }))
  ]),
  transition('active => previous', [
    animate('400ms ease-out', keyframes([
      style({
        transform: 'translateX(-50%) scale(1.0) rotateY(-360deg)',
        zIndex: 3, 
        offset: 0 
      }),
      style({ 
        transform: 'translateX(-75%) scale(0.875) rotateY(-355deg)',
        zIndex: 2, 
        offset: 0.5 
      }),
      style({ 
        transform: 'translateX(-100%) scale(0.75) rotateY(-350deg)',
        zIndex: 2, 
        offset: 1 
      })
    ]))
  ]),
  transition('active => next', [
    style({
      transform: 'translateX(-50%) scale(1.0) rotateY(360deg)'
    }),
    animate('400ms ease-out', keyframes([
      style({
        transform: 'translateX(-50%) scale(1.0) rotateY(360deg)',
        zIndex: 3, 
        offset: 0 
      }),
      style({ 
        transform: 'translateX(-25%) scale(0.875) rotateY(355deg)',
        zIndex: 2, 
        offset: 0.5 
      }),
      style({ 
        transform: 'translateX(0%) scale(0.75) rotateY(350deg)',
        zIndex: 2, 
        offset: 1 
      })
    ]))
  ]),
  transition('previous => active', [
    group([
      animate(600, keyframes([
        style({
          transform: 'translateX(-100%) scale(0.75) rotateY(-350deg)',
          zIndex: 'auto', 
          offset: 0 
        }),
        style({ 
          transform: 'translateX(-75%) scale(0.875) rotateY(-175deg)',
          zIndex: 9999, 
          offset: 0.5 
        }),
        style({ 
          transform: 'translateX(-50%)',
          zIndex: 9999, 
          offset: 1 
        })
      ])),
      query('.controls', [
        style({
          opacity: 0
        }),
        animate('300ms 300ms ease-in', style({
          opacity: 1,
        }))
      ])
    ])
  ]),
  transition('next => active', [
    group([
      animate(600, keyframes([
        style({
          transform: 'translateX(0%) scale(0.75) rotateY(350deg)',
          zIndex: 'auto', 
          offset: 0 
        }),
        style({ 
          transform: 'translateX(-35%) scale(0.875) rotateY(175deg)',
          zIndex: 9999, 
          offset: 0.5 
        }),
        style({ 
          transform: 'translateX(-50%)',
          zIndex: 9999, 
          offset: 1 
        })
      ])),
      query('.controls', [
        style({
          opacity: 0
        }),
        animate('300ms 300ms ease-in', style({
          opacity: 1,
        }))
      ])
    ])
  ])
]);