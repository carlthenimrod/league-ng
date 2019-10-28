import { trigger, transition, style, state, animate, query, stagger } from '@angular/animations';

export const noticeListEnterTrigger = trigger('noticeListEnter', [
  transition(':enter', [
    query('.notice', [
      style({
        opacity: 0,
        transform: 'scale(0.9)'
      }),
      stagger(100, [
        animate('300ms ease-out')
      ])
    ])
  ]),
  transition(':leave', [
    query('.notice', [
      animate('150ms ease-in', style({
        opacity: 0,
        transform: 'scale(0.5)'
      }))
    ])
  ])
]);

export const noticeToggleTrigger = trigger('noticeToggle', [
  transition(':enter', [
    style({
      opacity: 0,
      height: 0,
      padding: 0,
      transform: 'scale(0.9)'
    }),
    animate('100ms ease-out', style({
      height: '*',
      padding: '*'
    })),
    animate('300ms ease-out')
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({
      opacity: 0,
      transform: 'scale(0.5)'
    })),
    animate('100ms ease-out', style({
      height: 0,
      padding: 0
    }))
  ])
]);

export const noNoticesToggleTrigger = trigger('noNoticesToggle', [
  state('show', style({
    opacity: 1
  })),
  state('hide', style({
    display: 'none',
    opacity: 0
  })),
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('150ms ease-in', style({
      opacity: 1
    }))
  ]),
  transition('hide => show', [
    style({
      display: 'block'
    }),
    animate('150ms ease-in')
  ])
]);
