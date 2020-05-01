import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Generics, Project } from '../../@core/models';
import { Select, Store } from '@ngxs/store';
import { ProjectState } from '../../@core/state';
import { Observable } from 'rxjs';
import { DeleteProject, GetAllPageableProjects, GetProjectById } from '../../@core/state/actions';
import { NbDialogService } from '@nebular/theme';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private store: Store, private dialogService: NbDialogService, private toastr: ToastrService) {}

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

  openAddProjectModal(editable = false, title = 'Add Project') {
    this.dialogService.open(ProjectFormComponent, {
      context: {
        title: title,
        isEdit: editable,
      },
    });
  }

  editProject(value) {
    this.store.dispatch(new GetProjectById(value));
    this.openAddProjectModal(true, 'Edit Project');
  }

  deleteProject(value) {
    this.store.dispatch(new DeleteProject(value)).subscribe({
      next: () => {
        this.toastr.success('Operation handled successfully', 'SUCCESS');
        this.setPage({ offset: 0 });
      },
      error: () => {
        this.toastr.error('Operation not handled.', 'ERROR');
      },
    });
  }
}
