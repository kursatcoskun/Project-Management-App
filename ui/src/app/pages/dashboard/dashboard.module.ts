import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [NbCardModule, ThemeModule, NgxDatatableModule, DashboardRoutingModule, RouterModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
