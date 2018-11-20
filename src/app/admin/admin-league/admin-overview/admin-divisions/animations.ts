import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const unassignedTeamsToggleTrigger = trigger('unassignedTeamsToggle', [
  transition(':enter', [
    query('button', [
      style({
        transform: 'scale(0)'
      })
    ], { optional: true }),
    style({
      height: 0,
      opacity: 0
    }),
    animate(100, style({
      height: '*'
    })),
    animate(100),
    query('button', [
      stagger(100, [
        animate(100, style({
          transform: 'scale(1)'
        }))
      ])
    ], { optional: true })
  ]),
  transition(':leave', [
    animate(100, style({
      opacity: 0
    })),
    animate(100, style({
      height: 0
    }))
  ])
]);

export const unassignedTeamEnterTrigger = trigger('unassignedTeamEnter', [
  transition(':enter', [
    style({
      transform: 'scale(0)'
    }),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ])
]);

export const leagueOverviewEnterTrigger = trigger('leagueOverviewEnter', [
  transition(':enter', [
    query('.division', [
      style({
        height: 0,
        opacity: 0
      }),
      stagger(100, [
        animate(100, style({
          height: '*'
        })),
        animate(100)
      ])
    ], { optional: true })
  ])
]);
