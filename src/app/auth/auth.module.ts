import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: 'connexion-component', component: ConnexionComponent},
  { path: 'create-component', component: CreateComponent},
  {redirectTo: 'create-component', path: ''}
];

@NgModule({
  declarations: [
    ConnexionComponent,
    CreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class AuthModule { }
