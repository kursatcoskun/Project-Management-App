import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Store } from '@ngxs/store';
import { Project } from '../models';
import { GetAllProjects, GetProjectById } from '../state/actions';

@Injectable()
export class SampleResolver implements Resolve<Project.ProjectState> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project.ProjectState> {
    return this.store.dispatch([new GetAllProjects(), new GetProjectById(1)]);
  }
}
