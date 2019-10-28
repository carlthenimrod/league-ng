import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const teamsEnterTrigger = trigger('teamsEnter', [
  transition(':enter', [
    query('app-admin-droppable', [
      style({
        height: 0,
        opacity: 0
      }),
      stagger(50, [
        animate(100, style({
          height: '*'
        })),
        animate(100)
      ])
    ], { optional: true })
  ])
]);

export const teamEnterTrigger = trigger('teamEnter', [
  transition(':enter', [
    style({
      height: 0,
      opacity: 0
    }),
    animate(100, style({
      height: '*'
    })),
    animate(100)
  ])
]);
