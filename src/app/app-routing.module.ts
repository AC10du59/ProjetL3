import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CommunauteComponent } from './pages/communaute/communaute.component';
import { CreationCommunauteComponent } from './pages/creation-communaute/creation-communaute.component';

const routes: Routes = [
  {
    path: 'matchs',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'communaute',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'communaute'
      },
      {
        path: 'communaute',
        component: CommunauteComponent
      },
      {
        path: 'creation-communaute',
        component: CreationCommunauteComponent
      }
    ],
    canActivate: [AuthGuard]
  },

  {path: '**', redirectTo: '/matchs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
