import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesService } from './pictures.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pictures-page',
  templateUrl: './pictures-page.component.html',
  styleUrls: ['./pictures-page.component.css'],
  animations: [
    trigger('openAddPicturePanel', [
      state('closed', style({
        opacity: 0,
        width: 0,
        height: 0
      })),
      state('open', style({
        opacity: 1
      })),
      transition('closed => open', [
        style({
          width: '100%',
          height: '100%'
        }),
        animate(300)
      ]),
      transition('open => closed', [
        animate(300, style({
          opacity: 0
        })),
      ])
    ]),
    trigger("startPicture", [
      transition(":enter", [style({
        width: '*',
        height: '*'
      }), 
       style({
        width: 0,
        height: 0
      }),
    animate(1000)]
    )
  ])]
})

export class PicturesPageComponent implements OnInit {

  clstate = 'closed';
  pictures: PicturesService;
  http: HttpService;
  addForm: FormGroup;

  constructor(private picturesS: PicturesService,
    private router: Router,
    private phttp: HttpService) {
    this.pictures = picturesS;
    this.http = phttp;
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });
  }

  routePicture(id: number) {
    this.router.navigate(["/0"]);
  }

  addPicture() {
    this.picturesS.addPicture(this.addForm.value);
  }

  deletePicture(id) {
    let value = confirm("Delete this picture?");

    if (value) {
      this.picturesS.deletePicture(id);
    }
  }
}
