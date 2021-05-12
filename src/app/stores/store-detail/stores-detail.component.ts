import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/stores/en.json';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store-service.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'ik-stores-detail',
  templateUrl: './stores-detail.component.html',
})
export class StoresDetailComponent implements OnInit {
  storeInfo: Store;
  userInfo: User;
  storeJson = json;
  managers = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private readonly storeService: StoreService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    const params: any = this.activeRoute.params;
    this.storeService
      .getStores(new Map<string, string>().set('id', params.value.id))
      .pipe(
        tap((res: any) => (this.storeInfo = res[0])),
        switchMap((result) =>
          this.userService.getUserById(this.storeInfo.regionalId)
        )
      )
      .subscribe((res) => (this.userInfo = res[0]));
  }
}
