import { CanActivate, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators'

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private __store: Store<fromRoot.State>) {

    }

    canActivate() {
        return this.__store.select(fromRoot.getIsAuth);
    }

    canLoad() {
        return this.__store.select(fromRoot.getIsAuth).pipe(take(1));
    }

}