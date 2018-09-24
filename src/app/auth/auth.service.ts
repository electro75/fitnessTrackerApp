import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {

    constructor(private router: Router, private __auth: AngularFireAuth,
                private trainingService: TrainingService) {  }

    authChange = new Subject<boolean>();
    private isAuthentiacted = false

    registerUser(authData: AuthData,) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random()*1000).toString()
        // }
        this.__auth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.authSuccessfully();
            })
            .catch(error => {
                console.log(error)
            })
    }

    login(authData: AuthData) {
        // angular fire also stores and sends the required token. making unauthorised access impossible
        this.__auth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.authSuccessfully();
            })
            .catch(error => {
                console.log(error)
            })
    }

    logout() {
        this.trainingService.cancelSubscriptions();
        this.__auth.auth.signOut();
        this.isAuthentiacted = false
        this.authChange.next(false);
        this.router.navigate(['/login']);
        
    }

    

    isAuth() {
        return this.isAuthentiacted
    }

    private authSuccessfully() {
        this.isAuthentiacted = true
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}