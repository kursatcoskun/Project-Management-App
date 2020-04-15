import { Project } from '../../models';

export class CreateProject {
  static readonly type = '[Project] Create';
  constructor(public payload: Project.ProjectWrapper) {}
}

export class GetAllProjects {
  static readonly type = '[Project] Get All Projects';
  constructor() {}
}

export class GetProjectById {
  static readonly type = '[Project] Get Project By Id';
  constructor(public payload: number) {}
}

export class GetProjectsByPagination {
  static readonly type = '[Project] Get Project By Pagination';
  constructor(public payload: any) {}
}

export class UpdateProject {
  static readonly type = '[Project] Update Project';
  constructor(public payload: Project.ProjectWrapper) {}
}

export class DeleteProject {
  static readonly type = '[Project] Delete Project';
  constructor(public payload: number) {}
}
