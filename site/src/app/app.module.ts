import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PicturesPageComponent } from './pictures-page/pictures-page.component';
import { PicturesRoutingModule } from './pictures-page/pictures-routing,module';
import { PicturePageComponent } from './picture-page/picture-page.component';
import { HttpService } from './http.service';
import { PicturesService } from './pictures-page/pictures.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    NotFoundPageComponent,
    PicturesPageComponent,
    PicturePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PicturesRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService, 
    PicturesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
