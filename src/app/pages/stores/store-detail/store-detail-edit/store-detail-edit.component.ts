import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'app-store-detail-edit',
  templateUrl: './store-detail-edit.component.html',
})
export class StoresDetailEditComponent implements OnInit, OnDestroy {
  @ViewChild('regionalManagerChangeModal')
  regionalManagerChangeModal: ModalComponent;

  store: Store;
  currentUpdatedInfo: Store;
  regionalAndDistrictManagers: User[];
  managers = [];

  loading = true;
  disableSave = false;
  destroy = new Subject<void>();

  constructor(
    private readonly storeService: StoreService,
    private readonly popupService: PopupService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.data
      .pipe(
        tap((res) => (this.store = res.store.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(event: Store) {
    if (
      this.store.regionalManagerId &&
      this.store.regionalManagerId !== event.regionalManagerId
    ) {
      this.currentUpdatedInfo = event;
      this.regionalManagerChangeModal.open();
      this.disableSave = true;
    } else {
      this.loading = true;
      this.storeSave(event);
    }
  }

  onRegionalManagerChangeConfirm() {
    this.regionalManagerChangeModal.close();
    this.storeSave(this.currentUpdatedInfo);
  }

  storeSave(event: Store) {
    this.loading = true;
    this.storeService.updateStore(this.store.id, event).subscribe({
      next: () => {
        this.router.navigate([`/store/${event.id}/details`]);
        this.popupService.success('Store sucessfully updated!');
      },
      error: () => {
        this.router.navigate([`/store/${this.store.id}/details`]);
        this.popupService.error('Store could not be updated at this time!');
      },
    });
  }

  onModalClose() {
    this.resetStatus();
    this.regionalManagerChangeModal.close();
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
