import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { ManagerDetailComponent } from './manager-detail/manager-detail.component';
import { ManagerOverviewComponent } from './manager-overview/manager-overview.component';
import { MoveManagerComponent } from './move-manager/move-manager.component';

@NgModule({
  declarations: [
    ManagerOverviewComponent,
    ManagerDetailComponent,
    MoveManagerComponent,
    AddManagerComponent,
  ],
  imports: [SharedModule],
})
export class ManagersModule {}
