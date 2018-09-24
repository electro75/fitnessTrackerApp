import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service';


@Injectable()
export class AuthService {

    constructor(private router: Router, private __auth: AngularFireAuth,
                private trainingService: TrainingService, private snackbar: MatSnackBar) {  }

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
        this.__auth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                this.snackbar.open(error.message, null, {
                    duration: 3000
                });
            })
    }

    login(authData: AuthData) {
        // angular fire also stores and sends the required token. making unauthorised access impossible
        this.__auth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                this.snackbar.open(error.message, null, {
                    duration: 3000
                });
            })
    }

    logout() {
       
        this.__auth.auth.signOut();
        
        
    }

    

    isAuth() {
        return this.isAuthentiacted
    }

}