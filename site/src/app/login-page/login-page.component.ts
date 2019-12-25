import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

	form: FormGroup;

	constructor() { }

	ngOnInit() {

		this.form = new FormGroup({
			'email': new FormControl("", [Validators.required, Validators.email]),
			'password': new FormControl("", [Validators.required, Validators.minLength(8)])
		})
	}

	onSubmit() {
		console.log(this.form);
	}
}
