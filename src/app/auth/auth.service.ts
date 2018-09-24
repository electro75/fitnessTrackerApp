import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class AuthService {

    constructor(private router: Router, private __auth: AngularFireAuth) {  }

    authChange = new Subject<boolean>();
    private user: User;

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
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random()*1000).toString()
        // }
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
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}