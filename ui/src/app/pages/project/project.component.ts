import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Generics, Project } from '../../@core/models';
import { Select, Store } from '@ngxs/store';
import { ProjectState } from '../../@core/state';
import { Observable } from 'rxjs';
import { GetAllPageableProjects } from '../../@core/state/actions';

@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
  @Select(ProjectState.getAllProjectsByPagination)
  pageProjects$: Observable<Generics.GenericResponse<Project.ProjectPaged>>;

  // @ts-ignore
  @ViewChild('ActionTemplate') ActionsTemplate: TemplateRef<any>;

  page = new Generics.Page();
  cols = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.cols = [
      { prop: 'id', name: 'No' },
      { prop: 'projectName', name: 'Project Name' },
      { prop: 'projectCode', name: 'Project Code' },
      { prop: 'id', name: 'Actions', cellTemplate: this.ActionsTemplate, flexGrow: 1, sortable: false },
    ];
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.store.dispatch(new GetAllPageableProjects({ page: pageInfo.offset, itemSizePerPage: this.page.size }));
  }
}
