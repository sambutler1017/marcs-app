import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DeleteStoreModalComponent } from './store-detail/modals/delete-store-modal/delete-store-modal.component';
import { StoresDetailEditComponent } from './store-detail/store-detail-edit/store-detail-edit.component';
import { StoresDetailComponent } from './store-detail/stores-detail.component';
import { AddStoreComponent } from './stores-overview/add-store/add-store.component';
import { StoresOverviewComponent } from './stores-overview/stores-overview.component';
import { StoresComponent } from './stores.component';

@NgModule({
  declarations: [
    StoresDetailComponent,
    StoresOverviewComponent,
    StoresComponent,
    StoresDetailEditComponent,
    AddStoreComponent,
    DeleteStoreModalComponent,
  ],
  imports: [SharedModule],
})
export class StoresModule {}
