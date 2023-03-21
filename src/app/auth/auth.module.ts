import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { SharedModule } from '../shared/shared.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: 'connexion-component', component: ConnexionComponent},
  { path: 'create-component', component: CreateComponent},
  { path: 'accueil-component', component: AccueilComponent},
  {redirectTo: 'accueil-component', path: ''}
];

@NgModule({
  declarations: [
    ConnexionComponent,
    CreateComponent,
    AccueilComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class AuthModule { }
