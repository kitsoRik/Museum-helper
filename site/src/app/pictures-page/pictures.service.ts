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
          this.updateAllPictures();
     }

     addPicture(picture : any) {
          this.http.addPicture(picture).subscribe((data) => {
               let picture = data;
               picture['iconPath'] = picture['icon_path'];
               picture['icon_path'] = undefined;
               this.pictures.push(picture);
          });
     }

     deletePicture(id : any) {
          this.http.post("deletePicture", { id: id }).subscribe((data) => {
               console.log(data);
               let picture = this.pictures.find((p) => p.id == id);
               var index = this.pictures.indexOf(picture);
               if (index > -1) {
                    this.pictures.splice(index, 1);
                    this.updateAllPictures();
               }
          });
     }

     getPictureById(id : number) {
          return this.pictures.find((p) => p.id == id);
     }

     updateAllPictures() {
          this.http.getPictures().subscribe((data) => {
               this.pictures = data;
               this.updatePictures.emit();
          });
     }
}
