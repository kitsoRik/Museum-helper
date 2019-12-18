import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

     pictures : any = [];

     updatePictures : EventEmitter<any> = new EventEmitter();

     constructor(private http : HttpService) {
          this.http.getPictures().subscribe((data) => {
               this.pictures = data;
               this.updatePictures.emit();
          });
     }

     getPictureById(id : number) {
          return this.pictures.find((p) => p.id == id);
     }
}
