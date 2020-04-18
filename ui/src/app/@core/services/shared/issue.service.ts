import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Generics, Issue } from '../../models';
import GenericResponse = Generics.GenericResponse;

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private ISSUE_PATH = '/issue';
  private ISSUE_GET_BY_ID = this.ISSUE_PATH + '/getIssueById';
  private ISSUE_CREATE = this.ISSUE_PATH + '/CreateIssue';
  private ISSUE_UPDATE = this.ISSUE_PATH + '/UpdateIssue';
  private ISSUE_GET_BY_ID_DETAILS = this.ISSUE_PATH + '/getIssueByIdWithDetails';
  private ISSUE_GET_STATUSES = this.ISSUE_PATH + '/statuses';

  constructor(private apiService: ApiService) {}

  getAllByPagination(page: number, itemSizePerPage: number): Observable<Generics.GenericResponse<Issue.IssuePaged>> {
    return this.apiService.get(`${this.ISSUE_PATH}/getAllByPagination?page=${page}&size=${itemSizePerPage}`);
  }

  getIssueById(id: number): Observable<GenericResponse<Issue.IssueWrapper>> {
    return this.apiService.get(`${this.ISSUE_GET_BY_ID}/${id}`);
  }

  getIssueByIdWithDetails(id: number): Observable<GenericResponse<Issue.IssueDetail>> {
    return this.apiService.get(`${this.ISSUE_GET_BY_ID_DETAILS}/${id}`);
  }

  getIssueStatutes(): Observable<GenericResponse<any>> {
    return this.apiService.get(this.ISSUE_GET_STATUSES);
  }

  createIssue(issue: Issue.CreateIssueRequest): Observable<GenericResponse<Issue.IssueWrapper>> {
    return this.apiService.post(this.ISSUE_CREATE, issue);
  }

  updateIssue(issue: Issue.CreateIssueRequest): Observable<GenericResponse<Issue.IssueWrapper>> {
    return this.apiService.put(`${this.ISSUE_UPDATE}/${issue.id}`, issue);
  }

  deleteIssue(id: number): Observable<GenericResponse<Issue.IssueWrapper>> {
    return this.apiService.delete(`${this.ISSUE_UPDATE}/${id}`);
  }
}
