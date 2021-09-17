import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/stores/en.json';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { iff, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store-service.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'ik-stores-detail',
  templateUrl: './stores-detail.component.html',
})
export class StoresDetailComponent implements OnInit {
  storeInfo: Store;
  regionalInfo: User;
  managerInfo: User;
  storeJson = json;
  managers = [];
  loading = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private readonly storeService: StoreService,
    private readonly userService: UserService
  ) { }

  ngOnInit() {
    this.loading = true;
    const params: any = this.activeRoute.params;
    this.storeService
      .getStores(new Map<string, string>().set('id', params.value.id))
      .pipe(
        map((res) => res[0]),
        tap((res) => (this.storeInfo = res)),
        switchMap(() => this.userService.getUserById(this.storeInfo.regionalId)),
        tap(res => this.regionalInfo = res),
        switchMap(() => iff(() => !!this.storeInfo.managerId, this.userService.getUserById(this.storeInfo.managerId), of(null)),
        )
          .subscribe((res) => {
            this.loading = false;
            this.managerInfo = res;
          });
  }
}
