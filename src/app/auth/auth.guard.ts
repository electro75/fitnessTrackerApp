import { CanActivate, ActivatedRouteSnapshot, 
            RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { take } from 'rxjs/operators'

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private router: Router, private __store: Store<fromRoot.State>) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.__store.select(fromRoot.getIsAuth);
    }

    canLoad(route: Route) {
        return this.__store.select(fromRoot.getIsAuth).pipe(take(1));
    }

}