import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title>Are you sure?</h1>
                <mat-dialog-content>
                    <p>Come on! Only {{100 - passedData.progress}}% to go!</p>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-raised-button color='accent' [mat-dialog-close]="true">Yes, Exit</button>
                    <button mat-raised-button color='primary' [mat-dialog-close]="false">No, Lets finish this</button>
                </mat-dialog-actions>`
})
export class StopTrainingComponent {

    constructor(@Inject(MAT_DIALOG_DATA)public passedData: any) {  }
 }