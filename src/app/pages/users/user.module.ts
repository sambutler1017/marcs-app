import { NgModule } from '@angular/core';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagerStoresCardComponent } from './user-detail/cards/regional-stores-card/manager-stores-card.component';
import { UserVacationsCardComponent } from './user-detail/cards/user-vacations-card/user-vacations-card.component';
import { AddUserVacationModalComponent } from './user-detail/modals/add-user-vacation-modal/add-user-vacation-modal.component';
import { DeleteUserModalComponent } from './user-detail/modals/delete-user-modal/delete-user-modal.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserVacationsDetailComponent } from './user-detail/user-vacations/user-vacations-detail/user-vacations-detail.component';
import { UserVacationsComponent } from './user-detail/user-vacations/user-vacations.component';
import { AddUserComponent } from './user-overview/add-user/add-user.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserOverviewComponent,
    UserDetailComponent,
    UserComponent,
    AddUserComponent,
    UserVacationsComponent,
    UserVacationsDetailComponent,
    UserVacationsCardComponent,
    AddUserVacationModalComponent,
    DeleteUserModalComponent,
    ManagerStoresCardComponent,
  ],
  imports: [SharedModule, InsiteKitModule],
})
export class UserModule {}
