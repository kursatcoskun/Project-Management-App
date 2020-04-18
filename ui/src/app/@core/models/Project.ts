import { Generics } from './Generics';

export namespace Project {
  export interface ProjectWrapper {
    id: number;
    projectName: string;
    projectCode: string;
  }
  export interface ProjectPaged {
    number: number;
    size: number;
    sort: any;
    totalPages: any;
    totalElements: any;
    content: ProjectWrapper;
  }
  export class ProjectState {
    createProjectResponse: ProjectWrapper;
    projectsResponse: Generics.GenericResponse<ProjectWrapper>;
    projectPagination: Generics.GenericResponse<ProjectPaged>;
    selectedProject: ProjectWrapper;
  }
}
