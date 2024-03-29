import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import {
  Access,
  AppFeature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { BlockDatesService } from 'src/service/block-dates-service/block-dates.service';
import { UserService } from 'src/service/user-service/user.service';
import { AddBlockOutDateModalComponent } from '../modals/add-block-out-date-modal/add-block-out-date-modal.component';
import { BlockDateDetailModalComponent } from '../modals/block-date-detail-modal/block-date-detail-modal.component';

@Component({
  selector: 'app-block-dates-overview',
  templateUrl: './block-dates-overview.component.html',
  styleUrls: ['./block-dates-overview.component.scss'],
})
export class BlockDatesOverviewComponent {
  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChild(AddBlockOutDateModalComponent)
  addBlockOutDateModal: AddBlockOutDateModalComponent;
  @ViewChild(BlockDateDetailModalComponent)
  blockOutDateDetailModal: BlockDateDetailModalComponent;
  blockOutDatesDataloader: any;

  currentSelectedBlockDate: BlockOutDate;
  currentSelectedUser: User;
  loading: boolean;

  Feature = AppFeature;
  Access = Access;

  constructor(
    private readonly blockDatesService: BlockDatesService,
    private readonly userService: UserService
  ) {
    this.blockOutDatesDataloader = () => this.getBlockOutDatesDataloader();
  }

  getBlockOutDatesDataloader() {
    return this.blockDatesService.getBlockOutDates();
  }

  rowClick(event: any) {
    this.loading = true;
    this.currentSelectedBlockDate = event;
    this.blockOutDateDetailModal.modal.open();
    this.userService
      .getUserById(this.currentSelectedBlockDate.insertUserId)
      .subscribe((res) => {
        this.currentSelectedUser = res.body;
        this.blockOutDateDetailModal.updateForm();
        this.loading = false;
      });
  }

  refreshGrid() {
    this.grid.refresh();
  }
}
