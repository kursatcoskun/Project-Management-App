import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Issue } from '../models';
import { GetAllProjects, GetAllUsers, GetIssueStatuses } from '../state/actions';

@Injectable()
export class IssueResolver implements Resolve<Issue.IssueState> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Issue.IssueState> {
    return this.store.dispatch([new GetIssueStatuses(), new GetAllUsers(), new GetAllProjects()]);
  }
}
