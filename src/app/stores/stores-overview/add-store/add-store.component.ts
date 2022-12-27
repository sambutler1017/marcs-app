import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
})
export class AddStoreComponent {
  loading = false;

  constructor(
    private storeService: StoreService,
    private toastService: ToastrService,
    private router: Router,
    private location: Location
  ) {}

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(event: Store) {
    this.storeService.createStore(event).subscribe({
      next: () => {
        this.router.navigate([`/store/${event.id}/details`]);
        this.toastService.success(
          `${event.name} store has successfully been created!`
        );
      },
      error: () => {
        this.router.navigate([`/store/overview`]);
        this.toastService.error('Could not create store at this time!');
      },
    });
  }
}
