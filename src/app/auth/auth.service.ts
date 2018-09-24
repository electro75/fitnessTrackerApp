import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';


@Injectable()
export class AuthService {

    constructor(private router: Router, private __auth: AngularFireAuth,
                private trainingService: TrainingService, private snackbar: MatSnackBar,
                private uiService: UIService) {  }

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
        this.uiService.loadingStateChanged.next(true)
        this.__auth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false)
                console.log(result);
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false)
                this.uiService.showSnackbar(error.message, null, 3000);
            })
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true)
        // angular fire also stores and sends the required token. making unauthorised access impossible
        this.__auth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uiService.loadingStateChanged.next(false)
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false)
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