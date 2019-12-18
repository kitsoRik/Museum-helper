import { Component } from '@angular/core';
import { PicturesService } from './pictures-page/pictures.service';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mytestapp';

  constructor(private pictures : PicturesService, private http : HttpService) {
    
  }
}
