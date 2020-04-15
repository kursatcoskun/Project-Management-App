export namespace Project {
  export interface ProjectWrapper {
    id: number;
    projectName: string;
    projectCode: string;
  }
  export class ProjectState {
    createProjectResponse: ProjectWrapper;
    projects: ProjectWrapper[];
  }
}
