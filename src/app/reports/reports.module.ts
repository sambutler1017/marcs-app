import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReportsOverviewComponent } from './reports-overview/reports-overview.component';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [ReportsComponent, ReportsOverviewComponent],
  imports: [SharedModule],
})
export class ReportsModule {}
