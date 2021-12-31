import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/assets/translations/stores/en.json';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'ik-stores-overview',
  templateUrl: './stores-overview.component.html',
})
export class StoresOverviewComponent extends BaseComponent
  implements OnInit, OnDestroy {
  storeJson = json;
  outputEventColumns = ['id', 'regionalId'];
  excludedColumns = ['regionalId', 'managerId'];
  columns = ['id', 'name'];
  dataLoader: Store[];

  destroy = new Subject();

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.storeService
      .getStores(this.userService.managersOnlyMap())
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.dataLoader = res;
        this.triggerNotificationUpdate();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  handleClick(event: any) {
    this.router.navigate([`/store/details/${event.id}`]);
  }

  onSearch(value: string) {
    let params = this.userService.managersOnlyMap();

    if (params) {
      params.set('name', [value]).set('id', [value]);
    } else {
      params = new Map<string, string[]>();
      params.set('name', [value]).set('id', [value]);
    }

    this.storeService
      .getStores(params)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => (this.dataLoader = res));
  }
}
