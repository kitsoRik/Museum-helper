import { Component, OnInit, HostBinding, ViewChild, AfterViewInit, ElementRef, ViewChildren, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../http.service';
import { PicturesService } from '../pictures.service';
import { trigger, state, style } from '@angular/animations';

@Component({
	selector: 'app-picture-page',
	templateUrl: './picture-page.component.html',
	styleUrls: ['./picture-page.component.css']
})
export class PicturePageComponent implements AfterViewInit {

	@HostBinding("style.backgroundColor") icon;

	alo = "ALO";
	picture: any;
	pictureInfo: any;
	languageIndex: number = -1;
	http : HttpService;

	check(a) {
		if(a.key == 's' && a.ctrlKey) 
		{
			a.preventDefault();
			this.savePicture()
		}
	}

	constructor(private phttp: HttpService,
		private pictures: PicturesService,
		private active: ActivatedRoute) {
			
		this.http = phttp;
		let id = active.snapshot.params['id'];
		this.picture = pictures.getPictureById(id);
		this.http.getPictureInfo(id).subscribe((data) => {
			this.pictureInfo = data;
			if(this.pictureInfo.map((p) => p.language).length)
			{
				this.languageIndex = 0;
			}else {
				this.languageIndex = -1;
			}
		});
	}

	ngAfterViewInit() {
		let id = this.active.snapshot.params['id'];
		this.picture = this.pictures.getPictureById(id);
		this.pictures.updatePictures.subscribe(() => {
			this.picture = this.pictures.getPictureById(id);
			console.log(this.picture);
		});
	}

	getLanguages() {
		return this.pictureInfo.map((p) => p.language);
	}

	// updating icon in picture
	updateIcon(event) {
		this.http.updateIcon(event.target.files, {id: this.picture['id']}).subscribe((data) => {
			this.picture.iconPath = data['path'];
		});
	}

	deleteIcon() {
		this.http.deleteIcon(this.picture['id']).subscribe((result) => {
			if(result)
			{
				alert("DELETED");
				this.picture.iconPath = "null";
			}else {
				alert("ERROR DELETED");
			}
		});
	}

	savePicture() {
		this.http.savePicture(this.picture, this.pictureInfo).subscribe((data) => {
			alert("SAVED");
		});
	}

	addLanguage() {
		let result = prompt("Input message (ua, en ru): ");
		if(result.length == 0) return;
		this.pictureInfo.push({language: result,
		title: "Title",
		description: "Description"});
		if(this.languageIndex == -1)
			this.languageIndex = 0;
	}

	changeLanguage(event) {
		let index = 0;
		for (let l of this.getLanguages()) {
			if (l == event.target.value) {
				break;
			}
			index++;
		}
		this.languageIndex = index;
	}

	initDescriptionArea(event : Event) {
		var el = event.target;
		el['style'].cssText = 'height:auto; padding:0';
		el['style'].cssText = 'height:' + el['scrollHeight'] + 'px';
	}
}
