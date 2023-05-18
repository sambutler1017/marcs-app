import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  AppFeature,
} from 'projects/insite-kit/src/models/common.model';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'app-stores-overview',
  templateUrl: './stores-overview.component.html',
})
export class StoresOverviewComponent {
  dataLoader: any;

  Feature = AppFeature;
  Access = Access;

  constructor(private storeService: StoreService, private router: Router) {
    this.dataLoader = (params: any) => this.getStoreDataloader(params);
  }

  getStoreDataloader(params?: Map<string, string[]>) {
    return this.storeService.getStores(
      params ? params : new Map<string, string[]>()
    );
  }

  handleClick(event: any) {
    this.router.navigate([`/store/${event.id}/details`]);
  }

  onAddStore() {
    this.router.navigate(['/store/add-store']);
  }
}
