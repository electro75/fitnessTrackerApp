import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: [''],
      password: ['']
    })
  }

  submitForm() {
    console.log(this.loginForm);
  }

}
