import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RequestTrackerOverviewComponent } from './request-tracker-overview/request-tracker-overview.component';
import { RequestTrackerWizardComponent } from './request-tracker-wizard/request-tracker-wizard.component';
import { RequestTrackerComponent } from './request-tracker.component';

@NgModule({
  declarations: [
    RequestTrackerComponent,
    RequestTrackerOverviewComponent,
    RequestTrackerWizardComponent,
  ],
  imports: [SharedModule],
})
export class RequestTrackerModule {}
