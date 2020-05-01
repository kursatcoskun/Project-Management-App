import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import {CreateProject, GetAllPageableProjects, UpdateProject} from '../../../@core/state/actions';
import { Generics, Project } from '../../../@core/models';
import Page = Generics.Page;
import { ProjectState } from '../../../@core/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import snq from 'snq';

@Component({
  selector: 'ngx-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  @Select(ProjectState.getSelectedProject)
  selectedProject$: Observable<Project.ProjectWrapper>;

  @Input() title: string;

  @Input() isEdit: boolean;

  projectForm: FormGroup;
  page = new Page();

  constructor(protected ref: NbDialogRef<ProjectFormComponent>, private store: Store) {}

  dismiss() {
    this.ref.close();
  }

  ngOnInit(): void {
    this.projectForm = this.buildForm();
    this.checkEditable();
  }

  private checkEditable() {
    if (this.isEdit) {
      this.selectedProject$.subscribe((data) => {
        console.info(data);
        this.projectForm.controls.projectCode.setValue(data.projectCode);
        this.projectForm.controls.projectName.setValue(data.projectName);
        this.projectForm.controls.id.setValue(data.id);
      });
    }
  }

  buildForm() {
    return new FormGroup({
      id: new FormControl(),
      projectCode: new FormControl(''),
      projectName: new FormControl(''),
    });
  }
  onSubmit() {
    const addProjectRequest: Project.ProjectWrapper = Object.assign({}, this.projectForm.value);
    if (this.isEdit) {
      this.store.dispatch(new UpdateProject(addProjectRequest)).subscribe({
        next: () => {
          this.store.dispatch(new GetAllPageableProjects({ page: 0, itemSizePerPage: this.page.size }));
          this.dismiss();
        },
      });
    } else {
      this.store.dispatch(new CreateProject(addProjectRequest)).subscribe({
        next: () => {
          this.store.dispatch(new GetAllPageableProjects({ page: 0, itemSizePerPage: this.page.size }));
          this.dismiss();
        },
      });
    }
  }
}
