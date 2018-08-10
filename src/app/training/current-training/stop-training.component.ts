import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title>Are you sure?</h1>
                <mat-dialog-content>
                    <p>Come on! Only {{100 - passedData.progress}}% to go!</p>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-button [mat-dialog-close]="true">Yes</button>
                    <button mat-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions>`
})
export class StopTrainingComponent {
    constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {
        console.log(this.passedData);
      }
 }