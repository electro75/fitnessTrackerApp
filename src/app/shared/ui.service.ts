import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService { 

    constructor(private snackBar: MatSnackBar) {  }

    showSnackbar(msg, action, duration) {
        this.snackBar.open(msg, action, { duration })
    }

 }