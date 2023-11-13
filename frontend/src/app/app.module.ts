import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {APIInterceptor} from "./interceptors/api.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppMaterialModule} from "./app-material.module";
import {LoginComponent} from "./components/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from "./components/register/register.component";
import {ChatComponent} from "./components/chat/chat.component";


@NgModule({
    declarations: [
        AppComponent, LoginComponent, RegisterComponent, ChatComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        NgbModule,
        AppMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
