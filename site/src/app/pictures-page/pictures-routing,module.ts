import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PicturesPageComponent } from './pictures-page.component';
import { PicturePageComponent } from './picture-page/picture-page.component';

const routes : Routes = [
     { path: "pictures", component: PicturesPageComponent},
     { path: "pictures/:id", component: PicturePageComponent }
]

@NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
})

export class PicturesRoutingModule { }