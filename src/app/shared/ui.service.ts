import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService { 
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) {  }

    showSnackbar(msg, action, duration) {
        this.snackBar.open(msg, action, { duration })
    }

 }