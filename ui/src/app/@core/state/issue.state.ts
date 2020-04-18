import { Generics, Issue } from '../models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateIssue, DeleteIssue, GetAllPageableIssues, GetIssueById, UpdateIssue } from './actions';
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
