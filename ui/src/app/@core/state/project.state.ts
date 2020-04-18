import { Generics, Project } from '../models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  CreateProject,
  DeleteProject,
  GetAllPageableProjects,
  GetAllProjects,
  GetProjectById,
  UpdateProject,
} from './actions';
import { ProjectService } from '../services/shared';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<Project.ProjectState>({
  name: 'ProjectState',
  defaults: {
    createProjectResponse: {} as Project.ProjectWrapper,
    projectsResponse: {} as Generics.GenericResponse<Project.ProjectWrapper>,
    projectPagination: {} as Generics.GenericResponse<Project.ProjectPaged>,
    selectedProject: {} as Project.ProjectWrapper,
  },
})
export class ProjectState {
  constructor(private projectService: ProjectService) {}

  @Selector()
  static getCreateProjectResponse({ createProjectResponse }: Project.ProjectState) {
    return createProjectResponse;
  }

  @Selector()
  static getAllProjects({ projectsResponse }: Project.ProjectState) {
    return projectsResponse;
  }

  @Selector()
  static getAllProjectsByPagination({ projectPagination }: Project.ProjectState) {
    return projectPagination;
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
            projectsResponse: response,
          });
        }
      }),
    );
  }

  @Action(GetAllPageableProjects)
  getAllPageableProjects(
    { getState, patchState }: StateContext<Project.ProjectState>,
    { payload }: GetAllPageableProjects,
  ) {
    return this.projectService.getProjectsByPagination(payload.page, payload.itemSizePerPage).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Project.ProjectPaged>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            projectPagination: response,
          });
        }
      }),
    );
  }

  @Action(GetProjectById)
  getProjectById({ getState, patchState }: StateContext<Project.ProjectState>, { payload }: GetProjectById) {
    return this.projectService.getById(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Project.ProjectWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            selectedProject: response.data,
          });
        }
      }),
    );
  }

  @Action(UpdateProject)
  updateProject({ getState, patchState }: StateContext<Project.ProjectState>, { payload }: UpdateProject) {
    return this.projectService.updateProject(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Project.ProjectWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            selectedProject: response.data,
          });
        }
      }),
    );
  }

  @Action(DeleteProject)
  deleteProject({ getState, patchState }: StateContext<Project.ProjectState>, { payload }: DeleteProject) {
    return this.projectService.deleteProject(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Project.ProjectWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            selectedProject: response.data,
          });
        }
      }),
    );
  }
}
