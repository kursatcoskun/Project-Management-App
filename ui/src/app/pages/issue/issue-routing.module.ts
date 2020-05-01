import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueComponent } from './issue.component';
import { IssueResolver } from '../../@core/resolvers/issue.resolver';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueDetailResolver } from '../../@core/resolvers/issue-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: IssueComponent,
    resolve: {
      issue: IssueResolver,
    },
  },
  {
    path: 'detail/:id',
    component: IssueDetailComponent,
    resolve: {
      detail: IssueDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IssueResolver, IssueDetailResolver],
})
export class IssueRoutingModule {}
