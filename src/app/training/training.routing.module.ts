import { NgModule } from "@angular/core";

import { TrainingComponent } from "./training.component";

import { RouterModule } from "@angular/router";

const routes = [
    { path: '', component: TrainingComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TrainingRoutingModule {  }