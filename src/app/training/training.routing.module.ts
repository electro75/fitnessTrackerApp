import { NgModule } from "@angular/core";

import { TrainingComponent } from "./training.component";

import { AuthGuard } from "../auth/auth.guard";
import { RouterModule } from "@angular/router";

const routes = [
    { path: '', component: TrainingComponent, canActivate: [AuthGuard] }
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