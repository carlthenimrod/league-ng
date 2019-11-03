import { trigger, transition, style, animate } from '@angular/animations';

export const lightboxTrigger = trigger('lightbox', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('50ms ease-in', style({
      opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('50ms ease-out', style({ opacity: 0 }))
  ])
]);
