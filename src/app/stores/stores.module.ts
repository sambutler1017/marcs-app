import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoresDetailComponent } from './store-detail/stores-detail.component';
import { StoresOverviewComponent } from './stores-overview/stores-overview.component';
import { StoresComponent } from './stores.component';

@NgModule({
  declarations: [
    StoresDetailComponent,
    StoresOverviewComponent,
    StoresComponent,
  ],
  imports: [SharedModule],
})
export class StoresModule {}
