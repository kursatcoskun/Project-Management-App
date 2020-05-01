import { Project } from './Project';
import { User } from './User';
import { Generics } from './Generics';

export namespace Issue {
  export interface IssueWrapper {
    id: number;
    description: string;
    date: Date;
    details: string;
    issueStatus: IssueStatus;
    assignee: User.UserWrapper;
    project: Project.ProjectWrapper;
    status: any;
  }

  export interface IssueState {
    createIssueResponse: IssueWrapper;
    issuesResponse: Generics.GenericResponse<IssueWrapper>;
    issuePagination: Generics.GenericResponse<IssuePaged>;
    selectedIssue: IssueWrapper;
    selectedIssueDetail: IssueDetail;
    dashboardIssue: DashboardIssue;
    issueStatuses: string[];
  }

  export interface IssuePaged {
    number: number;
    size: number;
    sort: any;
    totalPages: any;
    totalElements: any;
    content: IssueWrapper;
  }

  export interface IssueDetail {
    id: number;
    description: string;
    date: Date;
    details: string;
    issueStatus: IssueStatus;
    assignee: User.UserWrapper;
    project: Project.ProjectWrapper;
    issueHistories: IssueHistory[];
  }

  export interface IssueHistory {
    id: number;
    issueId: number;
    description: string;
    date: Date;
    issueStatus: IssueStatus;
    details: string;
    assigneeId: number;
  }

  export interface CreateIssueRequest {
    id: number;
    description: string;
    details: string;
    date: Date;
    issueStatus: IssueStatus;
    assigneeId: number;
    projectId: number;
  }

  export interface DashboardIssue {
    openIssues: Generics.GenericResponse<IssuePaged>;
    inProgressIssues: Generics.GenericResponse<IssuePaged>;
    resolvedIssues: Generics.GenericResponse<IssuePaged>;
  }

  enum IssueStatus {
    OPEN,
    CLOSED,
    IN_REVIEW,
    IN_PROGRESS,
    RESOLVED,
  }
}
