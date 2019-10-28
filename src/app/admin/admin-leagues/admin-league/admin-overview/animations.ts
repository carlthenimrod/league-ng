import { trigger, transition, style, animate } from '@angular/animations';

export const paragraphEnterTrigger = trigger('paragraphEnter', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(100)
  ])
]);
