import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddTaskComponent } from './taches/add-task/add-task.component';
import { ModifTaskComponent } from './taches/modif-task/modif-task.component';
import { TachesComponent } from './taches/taches.component';
import { ContactComponent } from './contact/contact.component';
import { ClassementComponent } from './classement/classement.component';



const routes: Routes = [
  {path: 'taches-component', component: TachesComponent},
  {path: 'classement-component', component: ClassementComponent},
  {path: '', redirectTo: 'taches-component'}
];

@NgModule({
  declarations: [TachesComponent,
    AddTaskComponent,
    ModifTaskComponent,
    ContactComponent,
    ClassementComponent,
  ],
  imports: [RouterModule.forChild(routes), MatTableModule, SharedModule],
  exports: [RouterModule],
})
export class PagesModule {}
