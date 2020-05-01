import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Select, Store} from '@ngxs/store';
import {IssueState, ProjectState, UserState} from '../../../@core/state';
import {Observable} from 'rxjs';
import {Generics, Issue, Project, User} from '../../../@core/models';
import {GetIssueById, GetIssueByIdWithDetails, UpdateIssue} from '../../../@core/state/actions';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ngx-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
})
export class IssueDetailComponent implements OnInit {
  @Select(IssueState.getSelectedIssue)
  selectedIssue$: Observable<Issue.IssueWrapper>;

  @Select(IssueState.getSelectedIssueDetail)
  selectedIssueDetail$: Observable<Issue.IssueDetail>;

  @Select(UserState.getAllUsers)
  users$: Observable<Generics.GenericResponse<User.UserWrapper[]>>;

  @Select(ProjectState.getAllProjects)
  projects$: Observable<Generics.GenericResponse<Project.ProjectWrapper[]>>;

  @Select(IssueState.getIssueStatuses)
  issueStatuses$: Observable<string[]>;

  issueForm: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
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
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'},
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

  constructor(private store: Store, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.issueForm = this.buildForm();
    this.checkEditable();
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

  saveChanges() {
    const issueRequest: Issue.CreateIssueRequest = Object.assign({}, this.issueForm.value);
    issueRequest.date = new Date();
    this.store.dispatch(new UpdateIssue(issueRequest)).subscribe({
      next: () => {
        this.store.dispatch([new GetIssueByIdWithDetails(issueRequest.id), new GetIssueById(issueRequest.id)]);
        this.checkEditable();
        this.toastr.success('Saved Successfully', 'Success');
      },
    });
  }

  private checkEditable() {
    this.selectedIssue$.subscribe((data) => {
      this.issueForm.controls.assigneeId.setValue(data.assignee.id);
      this.issueForm.controls.id.setValue(data.id);
      this.issueForm.controls.projectId.setValue(data.project.id);
      this.issueForm.controls.date.setValue(data.date);
      this.issueForm.controls.description.setValue(data.description);
      this.issueForm.controls.details.setValue(data.details);
      this.issueForm.controls.issueStatus.setValue(data.issueStatus);
    });
  }
}
