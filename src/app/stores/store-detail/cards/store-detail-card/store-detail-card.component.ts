import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-store-detail-card',
  templateUrl: './store-detail-card.component.html',
})
export class StoreDetailCardComponent implements OnInit {
  @Input() storeId: string;

  storeInfo: Store;
  regionalInfo: User;
  managerInfo: User;

  loading = true;
  canEdit = false;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.storeService
      .getStoreById(this.storeId)
      .pipe(
        tap((res) => (this.storeInfo = res)),
        switchMap(() => this.getRegionalInfo()),
        tap((res) => (this.regionalInfo = res)),
        switchMap(() => this.storeService.canEditStore(this.storeInfo.id)),
        tap((res) => (this.canEdit = res)),
        switchMap(() => this.getManagerInfo())
      )
      .subscribe((res) => {
        this.loading = false;
        this.managerInfo = res;
      });
  }

  getManagerInfo() {
    return !!this.storeInfo?.managerId
      ? this.userService.getUserById(this.storeInfo.managerId)
      : of(null);
  }

  getRegionalInfo() {
    return !!this.storeInfo?.regionalId
      ? this.userService.getUserById(this.storeInfo.regionalId)
      : of(null);
  }

  onStoreEditClick() {
    this.router.navigate([`/store/${this.storeInfo.id}/details/edit/info`]);
  }
}
