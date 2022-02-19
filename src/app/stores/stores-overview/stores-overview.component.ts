import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { Observable } from 'rxjs';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'ik-stores-overview',
  templateUrl: './stores-overview.component.html',
})
export class StoresOverviewComponent {
  dataLoader: Observable<Store[]>;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) {
    this.dataLoader = this.getStoreDataLoader();
  }

  getStoreDataLoader() {
    return this.storeService.getStores(this.userService.getUserAccessMap());
  }

  handleClick(event: any) {
    this.router.navigate([`/store/details/${event.id}`]);
  }

  onSearch(value: any) {
    let params = this.userService.getUserAccessMap();

    if (params) {
      params.set('search', value);
    } else {
      params = new Map<string, string[]>();
      params.set('search', value);
    }

    this.dataLoader = this.storeService.getStores(params);
  }
}
