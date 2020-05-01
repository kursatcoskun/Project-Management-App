import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Generics, Issue } from '../models';
import { GetAllPageableIssuesByAssigneeAndStatus } from '../state/actions';

@Injectable()
export class DashboardResolver implements Resolve<Issue.IssueState> {
  page = new Generics.Page();

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Issue.IssueState> {
    return this.store.dispatch([
      new GetAllPageableIssuesByAssigneeAndStatus({
        id: +localStorage.getItem('userId'),
        issueStatus: 'OPEN',
        itemSizePerPage: this.page.size,
        page: 0,
      }),
      new GetAllPageableIssuesByAssigneeAndStatus({
        id: +localStorage.getItem('userId'),
        issueStatus: 'IN_PROGRESS',
        itemSizePerPage: this.page.size,
        page: 0,
      }),
      new GetAllPageableIssuesByAssigneeAndStatus({
        id: +localStorage.getItem('userId'),
        issueStatus: 'RESOLVED',
        itemSizePerPage: this.page.size,
        page: 0,
      }),
    ]);
  }
}
