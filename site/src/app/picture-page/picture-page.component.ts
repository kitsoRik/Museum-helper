import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { PicturesService } from '../pictures-page/pictures.service';

@Component({
  selector: 'app-picture-page',
  templateUrl: './picture-page.component.html',
  styleUrls: ['./picture-page.component.css']
})
export class PicturePageComponent implements OnInit {

  @HostBinding("style.backgroundColor") icon;

  picture : any;

  constructor(private pictures : PicturesService,
     private active : ActivatedRoute) {

      this.picture = pictures.getPictureById(active.snapshot.params['id']);
      // this.http.getPictureById(active.snapshot.params['id']).subscribe((data) => {
      //   this.picture = data;

      //   this.icon = `url(http://localhost:3000/${this.picture.iconPath});`;
      // });
  }

  ngOnInit() {

  }

}
