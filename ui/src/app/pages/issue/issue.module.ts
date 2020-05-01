import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [IssueComponent, IssueFormComponent, IssueDetailComponent];

const MODULES = [
  CommonModule,
  IssueRoutingModule,
  NbCardModule,
  ThemeModule,
  NbCardModule,
  NgxDatatableModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  NgSelectModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  ReactiveFormsModule,
  AngularEditorModule,
  RouterModule,
  NbListModule,
  NbDialogModule.forChild(),
];

const ENTRY_COMPONENTS = [IssueFormComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class IssueModule {}
