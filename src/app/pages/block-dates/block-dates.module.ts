import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlockDatesOverviewComponent } from './block-dates-overview/block-dates-overview.component';
import { BlockDatesComponent } from './block-dates.component';
import { AddBlockOutDateModalComponent } from './modals/add-block-out-date-modal/add-block-out-date-modal.component';
import { BlockDateDetailModalComponent } from './modals/block-date-detail-modal/block-date-detail-modal.component';
import { DeleteBlockOutDateModalComponent } from './modals/delete-block-out-date-modal/delete-block-out-date-modal.component';

@NgModule({
  declarations: [
    BlockDatesComponent,
    BlockDatesOverviewComponent,
    BlockDateDetailModalComponent,
    AddBlockOutDateModalComponent,
    DeleteBlockOutDateModalComponent,
  ],
  imports: [SharedModule],
})
export class BlockDatesModule {}
