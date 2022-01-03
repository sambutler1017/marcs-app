import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [SharedModule],
})
export class ReportsModule {}
