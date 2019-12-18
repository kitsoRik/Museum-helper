import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesService } from './pictures.service';

@Component({
  selector: 'app-pictures-page',
  templateUrl: './pictures-page.component.html',
  styleUrls: ['./pictures-page.component.css']
})

export class PicturesPageComponent implements OnInit {

  pictures;

  constructor(private picturesS : PicturesService,
     private router : Router) {
      this.pictures = this.picturesS.pictures;
    this.picturesS.updatePictures.subscribe(() => {
      this.pictures = this.picturesS.pictures;
    })
  }

  ngOnInit() {
      
  }
}
