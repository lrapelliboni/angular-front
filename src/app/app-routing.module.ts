import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleListComponent } from './vehicle-list';
import { VehicleAddComponent } from './vehicle-add';
import { VehicleEditComponent } from './vehicle-edit';

import { DefaultComponent } from './template';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';


const routes: Routes = [
  {
    path: 'veiculos', component: DefaultComponent, 
    children: [
      { path: '', component: VehicleListComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'veiculos/create', component: DefaultComponent, 
    children: [
      { path: '', component: VehicleAddComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'veiculos/edit/:id', component: DefaultComponent, 
    children: [
      { path: '', component: VehicleEditComponent }
    ],
    canActivate: [AuthGuard]
  },
  // Login
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'veiculos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
