import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public maxDate;
  public isLoading$ : Observable<any>;

  constructor(private authService: AuthService, private uiService: UIService,
              private __store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.__store.select(fromRoot.getIsLoading);
    
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18 );
  }

  submitForm(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

}
