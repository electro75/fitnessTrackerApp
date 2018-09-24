import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm : FormGroup;
  public isLoading = false;
  public loaderSub = new Subscription;

  constructor(private _fb: FormBuilder, private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.loaderSub = this.uiService.loadingStateChanged.subscribe(res => {
      this.isLoading = res
    })
    this.loginForm = this._fb.group({
      email: [''],
      password: ['']
    })
  }

  submitForm() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })

  }

  ngOnDestroy() {
    this.loaderSub.unsubscribe();
  }

}
