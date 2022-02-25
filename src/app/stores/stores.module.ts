import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoresDetailEditComponent } from './store-detail/store-detail-edit/store-detail-edit.component';
import { StoresDetailComponent } from './store-detail/stores-detail.component';
import { StoresOverviewComponent } from './stores-overview/stores-overview.component';
import { StoresComponent } from './stores.component';

@NgModule({
  declarations: [
    StoresDetailComponent,
    StoresOverviewComponent,
    StoresComponent,
    StoresDetailEditComponent,
  ],
  imports: [SharedModule],
})
export class StoresModule {}
