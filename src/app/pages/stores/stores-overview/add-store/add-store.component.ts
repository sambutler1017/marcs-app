import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
})
export class AddStoreComponent {
  loading = false;

  constructor(
    private readonly storeService: StoreService,
    private readonly popupService: PopupService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(event: Store) {
    this.storeService.createStore(event).subscribe({
      next: () => {
        this.router.navigate([`/store/${event.id}/details`]);
        this.popupService.success(
          `${event.name} store has successfully been created!`
        );
      },
      error: () => {
        this.router.navigate([`/store`]);
        this.popupService.error('Could not create store at this time!');
      },
    });
  }
}
