import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


import { TrainingComponent } from "src/app/training/training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
    declarations  : [
        TrainingComponent,  
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports       : [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModule,
        AngularFirestoreModule
    ],
    entryComponents : [
        StopTrainingComponent
    ]
})
export class TrainingModule {  }