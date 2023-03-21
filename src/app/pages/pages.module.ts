import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatchComponent} from './match/match.component';
import {ContactComponent} from './contact/contact.component';
import {ClassementComponent} from './classement/classement.component';
import {ReglesComponent} from './regles/regles.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PariComponent} from './pari/pari.component';
import {AccueilComponent} from './accueil/accueil.component';
import {CommunauteComponent} from './communaute/communaute.component';
import {CreationCommunauteComponent} from './creation-communaute/creation-communaute.component';

const routes: Routes = [
  {path: 'classement-component', component: ClassementComponent},
  {path: 'match-component', component: MatchComponent},
  {path: 'pari-component', component: PariComponent},
  {path: 'accueil-component', component: AccueilComponent},
  {path: 'communaute-component', component: CommunauteComponent},
  {path: 'creation-communaute-component', component: CreationCommunauteComponent},
  {path: '', redirectTo: 'accueil-component'}
];

@NgModule({
  declarations: [
    ContactComponent,
    ReglesComponent,
    ClassementComponent,
    ReglesComponent,
    MatchComponent,
    PariComponent,
    AccueilComponent,
  ],
  imports: [RouterModule.forChild(routes), MatTableModule, SharedModule, MatPaginatorModule],
  exports: [RouterModule],
})
export class PagesModule {
}
