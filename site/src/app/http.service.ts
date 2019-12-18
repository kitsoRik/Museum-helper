import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) {
  }

  getPictures() {
    return this.http.post("http://localhost:3000/getPictures", {});
  }
  
  getPictureById(id : number) {
    return this.http.post("http://localhost:3000/getPictureById", { id: id });
  }
}
