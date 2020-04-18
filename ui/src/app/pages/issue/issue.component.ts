import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IssueState } from '../../@core/state';
import { Observable } from 'rxjs';
import { Generics, Issue } from '../../@core/models';
import { GetAllPageableIssues } from '../../@core/state/actions';

@Component({
  selector: 'ngx-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IssueComponent implements OnInit {
  @Select(IssueState.getAllIssuesByPagination)
  pageIssues$: Observable<Generics.GenericResponse<Issue.IssuePaged>>;

  // @ts-ignore
  @ViewChild('ActionTemplate') ActionsTemplate: TemplateRef<any>;

  page = new Generics.Page();
  cols = [];

  constructor(private store: Store) {}

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

  setPage(pageInfo) {
    this.store.dispatch(new GetAllPageableIssues({ page: pageInfo.offset, itemSizePerPage: this.page.size }));
  }
}
