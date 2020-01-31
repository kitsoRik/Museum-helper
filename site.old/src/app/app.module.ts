import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PicturesPageComponent } from './pictures-page/pictures-page.component';
import { PicturesRoutingModule } from './pictures-page/pictures-routing,module';
import { PicturePageComponent } from './pictures-page/picture-page/picture-page.component';
import { HttpService } from './http.service';
import { PicturesService } from './pictures-page/pictures.service';
import { ContenteditableDirective } from './pictures-page/picture-page/contenteditable.directive';
import { LoginPageComponent } from './login-page/login-page.component';
import { PicturesPageGuard } from './pictures-page/pictures-page.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    NotFoundPageComponent,
    PicturesPageComponent,
    PicturePageComponent,
    ContenteditableDirective,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PicturesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService, 
    PicturesService,
    PicturesPageGuard,
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
