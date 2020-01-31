import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  tabs: any;

  constructor() { }

  ngOnInit() {
    this.tabs = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Pictures",
      path: "/pictures"
    }
  ];
  }

}
