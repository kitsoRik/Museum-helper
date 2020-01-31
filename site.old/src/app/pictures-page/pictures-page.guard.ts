import { CanActivate } from '@angular/router';


export class PicturesPageGuard implements CanActivate {
     canActivate() : boolean {
          return confirm("RLY?");
     }
}