import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'ik-stores-overview',
  templateUrl: './stores-overview.component.html',
})
export class StoresOverviewComponent implements OnInit {
  dataLoader: Store[];

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.storeService
      .getStores(this.userService.getUserAccessMap())
      .subscribe((res) => (this.dataLoader = res));
  }

  handleClick(event: any) {
    this.router.navigate([`/store/${event.id}/details`]);
  }

  onSearch(value: any) {
    let params = this.userService.getUserAccessMap();

    if (params) {
      params.set('search', value);
    } else {
      params = new Map<string, string[]>();
      params.set('search', value);
    }

    this.storeService
      .getStores(params)
      .subscribe((res) => (this.dataLoader = res));
  }

  onAddStore() {
    this.router.navigate(['/store/add-store']);
  }
}
