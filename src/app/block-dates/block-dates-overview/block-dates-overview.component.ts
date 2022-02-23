import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from 'projects/insite-kit/src/components/grid/grid.component';
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { BlockDatesService } from 'src/service/block-dates-service/block-dates.service';
import { UserService } from 'src/service/user-service/user.service';
import { AddBlockOutDateModalComponent } from '../modals/add-block-out-date-modal/add-block-out-date-modal.component';
import { BlockDateDetailModalComponent } from '../modals/block-date-detail-modal/block-date-detail-modal.component';

@Component({
  selector: 'app-block-dates-overview',
  templateUrl: './block-dates-overview.component.html',
  styleUrls: ['./block-dates-overview.component.scss'],
})
export class BlockDatesOverviewComponent implements OnInit {
  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChild(AddBlockOutDateModalComponent)
  addBlockOutDateModal: AddBlockOutDateModalComponent;
  @ViewChild(BlockDateDetailModalComponent)
  blockOutDateDetailModal: BlockDateDetailModalComponent;
  blockOutDatesData: BlockOutDate[];

  currentSelectedBlockDate: BlockOutDate;
  currentSelectedUser: User;
  loading: boolean;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly blockDatesService: BlockDatesService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.getBlockOutDatesSub();
  }

  rowClick(event: any) {
    this.loading = true;
    this.blockOutDateDetailModal.modal.open();

    this.blockDatesService
      .getBlockOutDateById(event.id)
      .pipe(
        tap((res) => (this.currentSelectedBlockDate = res)),
        switchMap(() =>
          this.userService.getUserById(
            this.currentSelectedBlockDate.insertUserId
          )
        )
      )
      .subscribe((res) => {
        this.currentSelectedUser = res;
        this.blockOutDateDetailModal.updateForm();
        this.loading = false;
      });
  }

  refreshGrid() {
    this.grid.refresh();
    this.getBlockOutDatesSub();
  }

  getBlockOutDatesSub() {
    this.blockDatesService
      .getBlockOutDates()
      .subscribe((res) => (this.blockOutDatesData = res));
  }
}
