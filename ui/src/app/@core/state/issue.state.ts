import { Generics, Issue } from '../models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  CreateIssue,
  DeleteIssue,
  GetAllPageableIssues,
  GetAllPageableIssuesByAssigneeAndStatus,
  GetAllPageableIssuesByProjectId,
  GetIssueById,
  GetIssueByIdWithDetails,
  GetIssueStatuses,
  UpdateIssue,
} from './actions';
import { IssueService } from '../services/shared';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<Issue.IssueState>({
  name: 'IssueState',
  defaults: {
    createIssueResponse: {} as Issue.IssueWrapper,
    issuesResponse: {} as Generics.GenericResponse<Issue.IssueWrapper>,
    issuePagination: {} as Generics.GenericResponse<Issue.IssuePaged>,
    selectedIssue: {} as Issue.IssueWrapper,
    dashboardIssue: {} as Issue.DashboardIssue,
    issueStatuses: [] as string[],
    selectedIssueDetail: {} as Issue.IssueDetail,
  },
})
export class IssueState {
  constructor(private issueService: IssueService) {}

  @Selector()
  static getCreateIssueResponse({ createIssueResponse }: Issue.IssueState) {
    return createIssueResponse;
  }

  @Selector()
  static getAllIssues({ issuesResponse }: Issue.IssueState) {
    return issuesResponse;
  }

  @Selector()
  static getAllIssuesByPagination({ issuePagination }: Issue.IssueState) {
    return issuePagination;
  }

  @Selector()
  static getOpenIssuesPagination({ dashboardIssue }: Issue.IssueState) {
    return dashboardIssue.openIssues.data;
  }

  @Selector()
  static getProgressIssuesPagination({ dashboardIssue }: Issue.IssueState) {
    return dashboardIssue.inProgressIssues.data;
  }

  @Selector()
  static getResolvedIssuesPagination({ dashboardIssue }: Issue.IssueState) {
    return dashboardIssue.resolvedIssues.data;
  }

  @Selector()
  static getSelectedIssue({ selectedIssue }: Issue.IssueState) {
    return selectedIssue;
  }

  @Selector()
  static getIssueStatuses({ issueStatuses }: Issue.IssueState) {
    return issueStatuses;
  }

  @Selector()
  static getSelectedIssueDetail({ selectedIssueDetail }: Issue.IssueState) {
    return selectedIssueDetail;
  }

  @Action(CreateIssue)
  createIssue({ patchState }: StateContext<Issue.IssueState>, { payload }: CreateIssue) {
    return this.issueService.createIssue(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Issue.IssueWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            createIssueResponse: response.data,
          });
        }
      }),
    );
  }

  @Action(GetAllPageableIssues)
  getAllPageableIssues({ getState, patchState }: StateContext<Issue.IssueState>, { payload }: GetAllPageableIssues) {
    return this.issueService.getAllByPagination(payload.page, payload.itemSizePerPage).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Issue.IssuePaged>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            issuePagination: response,
          });
        }
      }),
    );
  }

  @Action(GetAllPageableIssuesByProjectId)
  getAllPageableIssuesByProjectId(
    { getState, patchState }: StateContext<Issue.IssueState>,
    { payload }: GetAllPageableIssuesByProjectId,
  ) {
    return this.issueService.getIssuesByProjectIdPagination(payload.id, payload.page, payload.itemSizePerPage).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Issue.IssuePaged>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            issuePagination: response,
          });
        }
      }),
    );
  }

  @Action(GetIssueStatuses)
  getIssueStatuses({ patchState }: StateContext<Issue.IssueState>) {
    return this.issueService.getIssueStatutes().pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<string[]>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            issueStatuses: response.data,
          });
        }
      }),
    );
  }

  @Action(GetAllPageableIssuesByAssigneeAndStatus)
  getAllPageableIssuesByAssigneeAndStatus(
    { getState, patchState }: StateContext<Issue.IssueState>,
    { payload }: GetAllPageableIssuesByAssigneeAndStatus,
  ) {
    return this.issueService
      .getIssuesByAssigneeAndStatus(payload.id, payload.issueStatus, payload.page, payload.itemSizePerPage)
      .pipe(
        catchError((error) => throwError(error)),
        tap((response) => {
          if (response.data) {
            if (payload.issueStatus === 'OPEN') {
              const state = getState();
              state.dashboardIssue.openIssues = response;
              patchState(state);
            } else if (payload.issueStatus === 'IN_PROGRESS') {
              const state = getState();
              state.dashboardIssue.inProgressIssues = response;
              patchState(state);
            } else if (payload.issueStatus === 'RESOLVED') {
              const state = getState();
              state.dashboardIssue.resolvedIssues = response;
              patchState(state);
            }
          }
        }),
      );
  }

  @Action(GetIssueById)
  getIssueById({ getState, patchState }: StateContext<Issue.IssueState>, { payload }: GetIssueById) {
    return this.issueService.getIssueById(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Issue.IssueWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            selectedIssue: response.data,
          });
        }
      }),
    );
  }

  @Action(GetIssueByIdWithDetails)
  getIssueByIdWithDetails(
    { getState, patchState }: StateContext<Issue.IssueState>,
    { payload }: GetIssueByIdWithDetails,
  ) {
    return this.issueService.getIssueByIdWithDetails(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Issue.IssueDetail>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            selectedIssueDetail: response.data,
          });
        }
      }),
    );
  }

  @Action(UpdateIssue)
  updateIssue({ getState, patchState }: StateContext<Issue.IssueState>, { payload }: UpdateIssue) {
    return this.issueService.updateIssue(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Issue.IssueWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            selectedIssue: response.data,
          });
        }
      }),
    );
  }

  @Action(DeleteIssue)
  deleteIssue({ getState, patchState }: StateContext<Issue.IssueState>, { payload }: DeleteIssue) {
    return this.issueService.deleteIssue(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<Issue.IssueWrapper>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            selectedIssue: response.data,
          });
        }
      }),
    );
  }
}
