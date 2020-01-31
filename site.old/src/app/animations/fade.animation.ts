import { trigger, transition, animate, style } from '@angular/animations';


export const fadeAnimation = trigger("fade", [
     transition(":enter", [
          style({
               opacity: 0
          }),
          animate(3300)
     ])
])