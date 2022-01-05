import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
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
  ],
  imports: [SharedModule],
})
export class UserModule {}
