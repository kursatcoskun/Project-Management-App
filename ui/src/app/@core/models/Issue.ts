import {Project} from './Project';
import {User} from './User';

export namespace Issue {
  export interface IssueWrapper {
    id: number;
    description: string;
    date: Date;
    details: string;
    issueStatus: IssueStatus;
    assignee: User.UserWrapper;
    project: Project.ProjectWrapper;
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

  enum IssueStatus {
    OPEN,
    CLOSED,
    IN_REVIEW,
    IN_PROGRESS,
    RESOLVED,
  }
}
