import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RequestTrackerOverviewComponent } from './request-tracker-overview/request-tracker-overview.component';
import { RequestTrackerComponent } from './request-tracker.component';

@NgModule({
  declarations: [RequestTrackerComponent, RequestTrackerOverviewComponent],
  imports: [SharedModule],
})
export class RequestTrackerModule {}
