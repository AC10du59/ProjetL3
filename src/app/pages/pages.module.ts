import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddTaskComponent } from './taches/add-task/add-task.component';
import { ModifTaskComponent } from './taches/modif-task/modif-task.component';
import { TachesComponent } from './taches/taches.component';
import {MatchComponent} from './match/match.component';
import { ContactComponent } from './contact/contact.component';
import { ClassementComponent } from './classement/classement.component';
import { ReglesComponent } from './regles/regles.component';



const routes: Routes = [
  {path: 'taches-component', component: TachesComponent},
  {path: 'classement-component', component: ClassementComponent},
  {path: 'match-component', component: MatchComponent},
  {path: '', redirectTo: 'taches-component'}
];

@NgModule({
  declarations: [TachesComponent,
    AddTaskComponent,
    ModifTaskComponent,
    ContactComponent,
    ReglesComponent,
    ClassementComponent,
    ReglesComponent,
  ],
  imports: [RouterModule.forChild(routes), MatTableModule, SharedModule],
  exports: [RouterModule],
})
export class PagesModule {}
