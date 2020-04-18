import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Generics, Project } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private PROJECT_PATH = '/project';

  constructor(private apiService: ApiService) {}

  getProjectsByPagination(
    page: number,
    itemSizePerPage: number,
  ): Observable<Generics.GenericResponse<Project.ProjectPaged>> {
    return this.apiService.get(`${this.PROJECT_PATH}/getAllByPagination?page=${page}&size=${itemSizePerPage}`);
  }

  getAllProjects(): Observable<Generics.GenericResponse<Project.ProjectWrapper>> {
    return this.apiService.get(`${this.PROJECT_PATH}/getAllProjects`);
  }

  getById(id: number): Observable<Generics.GenericResponse<Project.ProjectWrapper>> {
    return this.apiService.get(`${this.PROJECT_PATH}/getProjectById/${id}`);
  }

  createProject(project: Project.ProjectWrapper): Observable<Generics.GenericResponse<Project.ProjectWrapper>> {
    return this.apiService.post(`${this.PROJECT_PATH}/CreateProject`, project);
  }

  updateProject(project: Project.ProjectWrapper): Observable<Generics.GenericResponse<Project.ProjectWrapper>> {
    return this.apiService.put(`${this.PROJECT_PATH}/UpdateProject`, project);
  }

  deleteProject(id: number): Observable<Generics.GenericResponse<Project.ProjectWrapper>> {
    return this.apiService.delete(`${this.PROJECT_PATH}/deleteProject/${id}`);
  }
}
