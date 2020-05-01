import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@core/guards';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('app/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'login',
    loadChildren: () => import('app/login/login.module').then((m) => m.LoginModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
