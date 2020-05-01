import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Issue } from '../models';
import { GetAllProjects, GetAllUsers, GetIssueById, GetIssueByIdWithDetails, GetIssueStatuses } from '../state/actions';

@Injectable()
export class IssueDetailResolver implements Resolve<Issue.IssueState> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Issue.IssueState> {
    const id = route.paramMap.get('id');
    return this.store.dispatch([
      new GetIssueById(+id),
      new GetIssueByIdWithDetails(+id),
      new GetAllProjects(),
      new GetIssueStatuses(),
      new GetAllUsers(),
    ]);
  }
}
