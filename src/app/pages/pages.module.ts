import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddTaskComponent } from './taches/add-task/add-task.component';
import { ModifTaskComponent } from './taches/modif-task/modif-task.component';
import { TachesComponent } from './taches/taches.component';



const routes: Routes = [
  { path: 'taches-component', component: TachesComponent },
  {path: '', redirectTo: 'taches-component'}
];

@NgModule({
  declarations: [TachesComponent,
    AddTaskComponent,
    ModifTaskComponent,
  ],
  imports: [RouterModule.forChild(routes), MatTableModule, SharedModule],
  exports: [RouterModule],
})
export class PagesModule {}
