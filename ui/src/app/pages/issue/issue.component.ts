import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IssueState, ProjectState } from '../../@core/state';
import { Observable } from 'rxjs';
import { Generics, Issue, Project } from '../../@core/models';
import { DeleteIssue, GetAllPageableIssues, GetAllPageableIssuesByProjectId } from '../../@core/state/actions';
import { ToastrService } from 'ngx-toastr';
import { NbDialogService } from '@nebular/theme';
import { IssueFormComponent } from './issue-form/issue-form.component';

@Component({
  selector: 'ngx-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComponent implements OnInit {
  @Select(IssueState.getAllIssuesByPagination)
  pageIssues$: Observable<Generics.GenericResponse<Issue.IssuePaged>>;

  @Select(ProjectState.getAllProjects)
  projects$: Observable<Generics.GenericResponse<Project.ProjectWrapper[]>>;
  // @ts-ignore
  @ViewChild('ActionTemplate') ActionsTemplate: TemplateRef<any>;

  page = new Generics.Page();
  cols = [];

  selectedId: number;

  constructor(private store: Store, private toastr: ToastrService, private dialogService: NbDialogService) {}

  ngOnInit() {
    this.cols = [
      { prop: 'id', name: 'No' },
      { prop: 'project.projectName', name: 'Project Name' },
      { prop: 'project.projectCode', name: 'Project Code' },
      { prop: 'description', name: 'Description' },
      { prop: 'issueStatus', name: 'Issue Status' },
      { prop: 'assignee.nameSurname', name: 'Assignee' },
      { prop: 'id', name: 'Actions', cellTemplate: this.ActionsTemplate, flexGrow: 1, sortable: false },
    ];
    this.setPage({ offset: 0 });
  }

  changeListType(event) {
    this.setPage({ offset: 0 });
  }

  clear() {
    this.selectedId = null;
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.selectedId !== undefined && this.selectedId !== null
      ? this.store.dispatch(
          new GetAllPageableIssuesByProjectId({
            id: this.selectedId,
            page: pageInfo.offset,
            itemSizePerPage: this.page.size,
          }),
        )
      : this.store.dispatch(new GetAllPageableIssues({ page: pageInfo.offset, itemSizePerPage: this.page.size }));
  }

  deleteIssue(value) {
    this.store.dispatch(new DeleteIssue(value)).subscribe({
      next: () => {
        this.toastr.success('Operation handled successfully', 'SUCCESS');
        this.setPage({ offset: 0 });
      },
      error: () => {
        this.toastr.error('An Error Occurred.', 'ERROR');
      },
    });
  }

  openIssueFormModal(editable = false, title = 'Add Issue') {
    this.dialogService.open(IssueFormComponent, {
      context: {
        title: title,
        isEdit: editable,
      },
    });
  }
}
