import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { SampleResolver } from '../../@core/resolvers/sample.resolver';

const routes: Routes = [{ path: '', component: ProjectComponent, resolve: { project: SampleResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SampleResolver],
})
export class ProjectRoutingModule {}
