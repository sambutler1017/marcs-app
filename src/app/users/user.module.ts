import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddUserVacationModalComponent } from './user-detail/modals/add-user-vacation-modal/add-user-vacation-modal.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserVacationsCardComponent } from './user-detail/user-vacations-card/user-vacations-card.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserVacationsDetailComponent } from './user-vacations/user-vacations-detail/user-vacations-detail.component';
import { UserVacationsComponent } from './user-vacations/user-vacations.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserOverviewComponent,
    UserDetailComponent,
    UserComponent,
    UserVacationsComponent,
    UserVacationsDetailComponent,
    UserVacationsCardComponent,
    AddUserVacationModalComponent,
  ],
  imports: [SharedModule],
})
export class UserModule {}
