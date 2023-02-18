import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-stores-overview',
  templateUrl: './stores-overview.component.html',
})
export class StoresOverviewComponent {
  dataLoader: any;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) {
    this.dataLoader = (params) => this.getStoreDataloader(params);
  }

  getStoreDataloader(params?: Map<string, string[]>) {
    return this.storeService.getStores(this.getParams(params));
  }

  getParams(params?: Map<string, string[]>) {
    if (params) {
      return new Map([
        ...params.entries(),
        ...this.userService.getUserAccessMap().entries(),
      ]);
    }
    return this.userService.getUserAccessMap();
  }

  handleClick(event: any) {
    this.router.navigate([`/store/${event.id}/details`]);
  }

  onAddStore() {
    this.router.navigate(['/store/add-store']);
  }
}
