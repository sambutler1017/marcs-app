import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NotificationDetailUserComponent } from './notification-detail/detail-user/detail-user.component';
import { NotificationDetailVactionComponent } from './notification-detail/detail-vacation/detail-vacation.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationOverviewComponent } from './notification-overview/notification-overview.component';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [
    NotificationComponent,
    NotificationOverviewComponent,
    NotificationDetailComponent,
    NotificationDetailUserComponent,
    NotificationDetailVactionComponent,
  ],
  imports: [SharedModule],
})
export class NotificationModule {}
