import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'ik-store-detail-edit',
  templateUrl: './store-detail-edit.component.html',
})
export class StoresDetailEditComponent implements OnInit, OnDestroy {
  @ViewChild('regionalChangeModal') regionalChangeModal: ModalComponent;

  store: Store;
  currentUpdatedInfo: Store;
  regionalAndDistrictManagers: User[];
  managers = [];

  loading = true;
  disableSave = false;
  destroy = new Subject();

  constructor(
    private readonly storeService: StoreService,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.data
      .pipe(
        tap((res) => (this.store = res.store)),
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
    if (this.store.regionalId && this.store.regionalId !== event.regionalId) {
      this.currentUpdatedInfo = event;
      this.regionalChangeModal.open();
      this.disableSave = true;
    } else {
      this.loading = true;
      this.storeSave(event);
    }
  }

  onRegionalChangeConfirm() {
    this.regionalChangeModal.close();
    this.storeSave(this.currentUpdatedInfo);
  }

  storeSave(event: Store) {
    this.loading = true;
    this.storeService.updateStore(this.store.id, event).subscribe(
      (res) => {
        this.router.navigate([`/store/${event.id}/details`]);
        this.toastService.success('Store sucessfully updated!');
      },
      (err) => {
        this.router.navigate([`/store/${this.store.id}/details`]);
        this.toastService.error('Store could not be updated at this time!');
      }
    );
  }

  onModalClose() {
    this.resetStatus();
    this.regionalChangeModal.close();
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
