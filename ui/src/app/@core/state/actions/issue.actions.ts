import { Issue } from '../../models';

export class CreateIssue {
  static readonly type = '[Issue] Create';

  constructor(public payload: Issue.CreateIssueRequest) {}
}

export class GetAllPageableIssues {
  static readonly type = '[Issue] Get All Pageable Issues';

  constructor(public payload: { page: number; itemSizePerPage: number }) {}
}

export class GetIssueById {
  static readonly type = '[Issue] Get Issue By Id';

  constructor(public payload: number) {}
}

export class GetIssueByIdWithDetails {
  static readonly type = '[Issue] Get Issue By Id With Details';

  constructor(public payload: number) {}
}

export class GetIssueStatuses {
  static readonly type = '[Issue] Get Issue Statuses';
}

export class GetAllPageableIssuesByProjectId {
  static readonly type = '[Issue] Get All Pageable Issues By Project ID';

  constructor(public payload: { id: number; page: number; itemSizePerPage: number }) {}
}

export class GetAllPageableIssuesByAssigneeAndStatus {
  static readonly type = '[Issue] Get All Pageable Issues By Assignee And Status';

  constructor(public payload: { id: number; issueStatus: string; page: number; itemSizePerPage: number }) {}
}

export class UpdateIssue {
  static readonly type = '[Issue] Update Issue';

  constructor(public payload: Issue.CreateIssueRequest) {}
}

export class DeleteIssue {
  static readonly type = '[Issue] Delete Issue';

  constructor(public payload: number) {}
}
