import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpService) { 
    http.post("dataAboutMe", {cookie: document.cookie}).subscribe((data : string) => {
      console.log(data);
    });
  }

  loginin(login : string, password : string) {
    this.http.loginin(login, password).subscribe((data : string) => {
      console.log(document.cookie);
    });
  }
}