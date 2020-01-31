import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  port : number = 3000;
  host : string = "5.45.118.116";
  url : string = "http://" + this.host + ":" + this.port + "/site/";
  iconUrl ="http://" +  this.host + ":" + this.port + "/";

  constructor(private http : HttpClient) {
  }

  get(path : any, object : any) {
    return this.http.get(this.url + path, object);
  }

  post(path : any, object : any) {
    return this.http.post(this.url + path, object);
  }

  addPicture(picture : any) {
    return this.http.post(this.url + "addPicture", picture);
  }

  getPictures() {
    return this.http.post(this.url + "getPictures", {});
  }
  
  getPictureInfo(id : number) {
    return this.http.post(this.url + "getPictureInfo", { id: id });
  }

  savePicture(picture : any, pictureInfo : any) {
    return this.http.post(this.url + "savePicture", {
      picture: picture, pictureInfo: pictureInfo
    });
  }

  updateIcon(pictures, options) {
    let formdata = new FormData();
    formdata.append("file", pictures[0]);
    formdata.append("options", JSON.stringify(options));
	  return this.http.post(this.url + "uploadIcon", formdata);
  }

  deleteIcon(id) {
    console.log(id);
	  return this.http.post(this.url + "deleteIcon", {id: id});
  }

  loginin(email : string, password : string) {
    return this.http.post(this.url + "loginin", { email, password });
  }
}
