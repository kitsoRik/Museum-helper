import { Component, OnInit, Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pictures-page',
  templateUrl: './pictures-page.component.html',
  styleUrls: ['./pictures-page.component.css']
})

export class PicturesPageComponent implements OnInit {

  pictures;

  constructor(private http : HttpService, private router : Router) {
    this.http.getPictures().subscribe((data) => {
      this.pictures = data;
    });
  }

  ngOnInit() {

  }
}
