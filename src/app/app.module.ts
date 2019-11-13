import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './_helpers';

import { VehicleListComponent } from './vehicle-list';
import { VehicleAddComponent } from './vehicle-add';
import { VehicleEditComponent } from './vehicle-edit';

// Login
import { LoginComponent } from './login';

// Template
import { DefaultComponent } from './template';

import {NgxMaskModule, IConfig} from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultComponent,
    VehicleAddComponent,
    VehicleEditComponent,
    VehicleListComponent, 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
