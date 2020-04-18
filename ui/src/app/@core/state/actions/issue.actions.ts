import { Generics, Issue } from '../../models';

export class CreateIssue {
  static readonly type = '[Issue] Create';
  constructor(public payload: Issue.CreateIssueRequest) {}
}

export class GetAllIssues {
  static readonly type = '[Issue] Get All Issues';
  constructor() {}
}

export class GetAllPageableIssues {
  static readonly type = '[Issue] Get All Pageable Issues';
  constructor(public payload: { page: number; itemSizePerPage: number }) {}
}

export class GetIssueById {
  static readonly type = '[Issue] Get Issue By Id';
  constructor(public payload: number) {}
}

export class GetIssuesByPagination {
  static readonly type = '[Issue] Get Issue By Pagination';
  constructor(public payload: any) {}
}

export class UpdateIssue {
  static readonly type = '[Issue] Update Issue';
  constructor(public payload: Issue.CreateIssueRequest) {}
}

export class DeleteIssue {
  static readonly type = '[Issue] Delete Issue';
  constructor(public payload: number) {}
}
