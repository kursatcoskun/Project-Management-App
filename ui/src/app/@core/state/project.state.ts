import { Generics, Project } from '../models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateProject, GetAllProjects } from './actions';
import { ProjectService } from '../services/shared';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<Project.ProjectState>({
  name: 'ProjectState',
  defaults: {
    createProjectResponse: {} as Project.ProjectWrapper,
    projects: [] as Project.ProjectWrapper[],
  },
})
export class ProjectState {
  constructor(private projectService: ProjectService) {}

  @Selector()
  static getCreateProjectResponse({ createProjectResponse }: Project.ProjectState) {
    return createProjectResponse;
  }

  @Action(CreateProject)
  createProject({ patchState }: StateContext<Project.ProjectState>, { payload }: CreateProject) {
    return this.projectService.createProject(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Project.ProjectWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            createProjectResponse: response.data,
          });
        }
      }),
    );
  }

  @Action(GetAllProjects)
  getAllProjects({ getState, patchState }: StateContext<Project.ProjectState>) {
    return this.projectService.getAllProjects().pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Project.ProjectWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            projects: [...getState().projects, response.data],
          });
        }
      }),
    );
  }
}
