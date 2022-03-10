import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';
import { DeleteStoreModalComponent } from './modals/delete-store-modal/delete-store-modal.component';

@Component({
  selector: 'ik-stores-detail',
  templateUrl: './stores-detail.component.html',
})
export class StoresDetailComponent implements OnInit {
  @ViewChild(DeleteStoreModalComponent)
  deleteStoreModal: DeleteStoreModalComponent;
  storeInfo: Store;
  regionalInfo: User;
  managerInfo: User;
  managers = [];
  loading = true;
  canEdit = false;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private activeRoute: ActivatedRoute,
    private readonly storeService: StoreService,
    private readonly userService: UserService,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    const params: any = this.activeRoute.params;
    this.storeService
      .getStores(new Map<string, string[]>().set('id', [params.value.id]))
      .pipe(
        map((res) => res[0]),
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
    return !!this.storeInfo.managerId
      ? this.userService.getUserById(this.storeInfo.managerId)
      : of(null);
  }

  getRegionalInfo() {
    return !!this.storeInfo.regionalId
      ? this.userService.getUserById(this.storeInfo.regionalId)
      : of(null);
  }

  onBackClick() {
    this.router.navigate(['/store/overview']);
  }

  onStoreEditClick() {
    this.router.navigate([`/store/${this.storeInfo.id}/details/edit/info`]);
  }
}
