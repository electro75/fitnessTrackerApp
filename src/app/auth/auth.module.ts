import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthRoutingModule } from '../auth/auth.routing.module';

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";


@NgModule({
    declarations : [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
    ]
})
export class AuthModule {  }