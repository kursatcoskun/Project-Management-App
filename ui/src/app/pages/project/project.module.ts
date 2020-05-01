import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import {NbButtonModule, NbCardModule, NbDialogModule, NbInputModule} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectFormComponent } from './project-form/project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [ProjectComponent, ProjectFormComponent];

const ENTRY_COMPONENTS = [ProjectFormComponent];

const MODULES = [
  CommonModule,
  ProjectRoutingModule,
  NbCardModule,
  ThemeModule,
  NgxDatatableModule,
  TranslateModule,
  FormsModule,
  NbButtonModule,
  NbInputModule,
  ReactiveFormsModule,
  NbDialogModule.forChild(),
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ProjectModule {}
