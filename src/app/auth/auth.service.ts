import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from '@angular/fire/auth'
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {

    constructor(private router: Router, private __auth: AngularFireAuth,
                private trainingService: TrainingService, private snackbar: MatSnackBar,
                private uiService: UIService, private __store: Store<fromRoot.State>) {  }

    authChange = new Subject<boolean>();
    private isAuthentiacted = false

    initAuthListener() {
        this.__auth.authState.subscribe(user => {
            if(user) {
                this.isAuthentiacted = true
                this.authChange.next(true); 
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.isAuthentiacted = false
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData,) {
        this.__store.dispatch(new UI.StartLoading())  //disapatches an action to indicate the start of loading.
        this.__auth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.__store.dispatch(new UI.StopLoading())   //dispatches an action to indicate finish loading
            })
            .catch(error => {
                this.__store.dispatch(new UI.StopLoading())
                this.uiService.showSnackbar(error.message, null, 3000);
            })
    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true)
        this.__store.dispatch(new UI.StartLoading())
        // angular fire also stores and sends the required token. making unauthorised access impossible
        this.__auth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                // this.uiService.loadingStateChanged.next(false)
                this.__store.dispatch(new UI.StopLoading())
            })
            .catch(error => {
                // this.uiService.loadingStateChanged.next(false)
                this.__store.dispatch(new UI.StopLoading())
                this.uiService.showSnackbar(error.message, null, 3000);
            })
    }

    logout() {
        this.__auth.auth.signOut();
    }

    

    isAuth() {
        return this.isAuthentiacted
    }

}