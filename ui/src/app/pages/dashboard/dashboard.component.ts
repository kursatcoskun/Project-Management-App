import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IssueState, ProjectState } from '../../@core/state';
import { Observable } from 'rxjs';
import { Generics, Issue, Project } from '../../@core/models';
import { GetAllPageableIssuesByAssigneeAndStatus, GetAllPageableIssuesByProjectId } from '../../@core/state/actions';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  @Select(IssueState.getOpenIssuesPagination)
  openIssues$: Observable<Issue.IssuePaged>;

  @Select(IssueState.getProgressIssuesPagination)
  progressIssues$: Observable<Issue.IssuePaged>;

  @Select(IssueState.getResolvedIssuesPagination)
  resolvedIssues$: Observable<Issue.IssuePaged>;

  @Select(ProjectState.getAllProjects)
  projects$: Observable<Generics.GenericResponse<Project.ProjectWrapper[]>>;
  // @ts-ignore
  @ViewChild('ActionTemplateOpen') ActionsTemplateOpen: TemplateRef<any>;

  // @ts-ignore
  @ViewChild('ActionTemplateProgress') ActionsTemplateProgress: TemplateRef<any>;

  // @ts-ignore
  @ViewChild('ActionTemplateClosed') ActionsTemplateClosed: TemplateRef<any>;

  page = new Generics.Page();
  cols = [];

  selectedId: number;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cols = [
      { prop: 'id', name: 'No' },
      { prop: 'description', name: 'Issue Title' },
      { prop: 'project.projectName', name: 'Project Name' },
      { prop: 'id', name: '', cellTemplate: this.ActionsTemplateOpen, flexGrow: 1, sortable: false },
    ];
    this.setPageOPENDatatable({ offset: 0 });
  }

  setPageOPENDatatable(pageInfo) {
    this.store.dispatch(
      new GetAllPageableIssuesByAssigneeAndStatus({
        id: 36,
        issueStatus: 'OPEN',
        page: pageInfo.offset,
        itemSizePerPage: this.page.size,
      }),
    );
  }

  setPage(pageInfo) {
    this.store.dispatch(
      new GetAllPageableIssuesByProjectId({
        id: this.selectedId,
        page: pageInfo.offset,
        itemSizePerPage: this.page.size,
      }),
    );
  }
}
