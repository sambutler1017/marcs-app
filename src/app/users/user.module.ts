import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserOverviewComponent, UserDetailComponent, UserComponent],
  imports: [SharedModule],
})
export class UserModule {}
