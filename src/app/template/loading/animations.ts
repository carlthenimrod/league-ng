import { trigger, transition, style, animate } from '@angular/animations';

export const loadingTrigger = trigger('loading', [
  transition(':leave', [
    animate('50ms ease-out', style({ opacity: 0 }))
  ])
]);
