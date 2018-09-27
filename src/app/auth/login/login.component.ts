import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map'
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  public isLoading$ : Observable<any>;
  public loaderSub = new Subscription;

  constructor(private _fb: FormBuilder, private authService: AuthService,
              private uiService: UIService, private __store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.__store.select(fromRoot.getIsLoading)

    // this.loaderSub = this.uiService.loadingStateChanged.subscribe(res => {
    //   this.isLoading = res
    // })
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

  // ngOnDestroy() {
  //   if(this.loaderSub) {
  //     this.loaderSub.unsubscribe();
  //   }
    
  // }

}
