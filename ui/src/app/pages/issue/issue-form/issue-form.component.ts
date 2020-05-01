import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IssueState, ProjectState, UserState } from '../../../@core/state';
import { Observable } from 'rxjs';
import { Generics, Issue, Project, User } from '../../../@core/models';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CreateIssue, GetAllPageableIssues, UpdateIssue } from '../../../@core/state/actions';
import Page = Generics.Page;
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'ngx-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent implements OnInit {
  @Select(IssueState.getSelectedIssue)
  selectedIssue$: Observable<Issue.IssueWrapper>;

  @Select(UserState.getAllUsers)
  users$: Observable<Generics.GenericResponse<User.UserWrapper[]>>;

  @Select(ProjectState.getAllProjects)
  projects$: Observable<Generics.GenericResponse<Project.ProjectWrapper[]>>;

  @Select(IssueState.getIssueStatuses)
  issueStatuses$: Observable<string[]>;

  @Input() title: string;

  @Input() isEdit: boolean;

  issueForm: FormGroup;
  page = new Page();

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '150px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  constructor(protected ref: NbDialogRef<IssueFormComponent>, private store: Store) {}

  dismiss() {
    this.ref.close();
  }

  ngOnInit(): void {
    this.issueForm = this.buildForm();
    this.checkEditable();
    this.users$.subscribe((data) => {
      console.info(data);
    });
  }

  buildForm() {
    return new FormGroup({
      id: new FormControl(),
      assigneeId: new FormControl(),
      date: new FormControl(),
      description: new FormControl(),
      details: new FormControl(),
      issueStatus: new FormControl(),
      projectId: new FormControl(),
    });
  }

  onSubmit() {
    const issueRequest: Issue.CreateIssueRequest = Object.assign({}, this.issueForm.value);
    issueRequest.date = new Date();
    if (this.isEdit) {
      this.store.dispatch(new UpdateIssue(issueRequest)).subscribe({
        next: () => {
          this.store.dispatch(new GetAllPageableIssues({ page: 0, itemSizePerPage: this.page.size }));
          this.dismiss();
        },
      });
    } else {
      this.store.dispatch(new CreateIssue(issueRequest)).subscribe({
        next: () => {
          this.store.dispatch(new GetAllPageableIssues({ page: 0, itemSizePerPage: this.page.size }));
          this.dismiss();
        },
      });
    }
  }

  private checkEditable() {
    if (this.isEdit) {
      this.selectedIssue$.subscribe((data) => {
        console.info(data);
        /*    this.projectForm.controls.projectCode.setValue(data.projectCode);
            this.projectForm.controls.projectName.setValue(data.projectName);*/
        this.issueForm.controls.id.setValue(data.id);
      });
    }
  }
}
