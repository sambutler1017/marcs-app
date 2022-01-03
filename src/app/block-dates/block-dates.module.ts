import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BlockDatesComponent } from './block-dates.component';

@NgModule({
  declarations: [BlockDatesComponent],
  imports: [SharedModule],
})
export class BlockDatesModule {}
