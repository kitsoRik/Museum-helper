import { Component, OnInit, Injectable, Input, ViewChild} from '@angular/core';
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
			transition(":enter", [
				style({
					opacity: 0
				}),
				animate(300, style({
					opacity: 1
				}))
			]),
			transition("* => void", [
				style({
					opacity: 1
				}),
				animate(300, style({
					opacity: 0
				}))
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

	LoadIcon : any = null;
	addPicturePanelState = 'closed';
	pictures: PicturesService;
	http: HttpService;
	addForm: FormGroup;

	@ViewChild("imageLoadIcon", {static: false}) imageLoadIcon : HTMLImageElement;

	constructor(private picturesS: PicturesService,
		private router: Router,
		private phttp: HttpService) {
		this.pictures = picturesS;
		this.http = phttp;

		this.pictures.pictureAdded.subscribe((result) => {
			if(result.ok)
			{
				this.addPicturePanelState = "closed";
			}
		});
	}

	ngOnInit() {
		this.addForm = new FormGroup({
			title: new FormControl("", Validators.required),
			description: new FormControl("", Validators.required),
			icon: new FormControl("")
		});
	}

	addPicture() {
		console.log(this.addForm);
		let formData = new FormData();
		formData.append("title", this.addForm.get("title").value);
		formData.append("description", this.addForm.get("description").value);
		formData.append("icon", this.LoadIcon);
		this.pictures.addPicture(formData);
	}

	deletePicture(id) {
		let value = confirm("Delete this picture?");

		if (value) {
			this.picturesS.deletePicture(id);
		}
	}

	onLoadIconChanged(event : Event) {
		var selectedFile = event.target['files'][0];
		this.LoadIcon = selectedFile;
		var reader = new FileReader();

		reader.onload = function(event) {
			document.getElementById("sukaid")['src'] = event.target['result'];
		};
		reader.readAsDataURL(selectedFile);
	}
}
