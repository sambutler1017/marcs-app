import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'app-store-detail-card',
  templateUrl: './store-detail-card.component.html',
})
export class StoreDetailCardComponent implements OnInit {
  @Input() store: Store;

  regionalInfo: User;
  managerInfo: User;

  loading = true;
  canEdit = false;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.storeService
      .hasEditStoreAccess(this.store)
      .pipe(
        tap((res) => (this.canEdit = res)),
        switchMap(() => this.getRegionalInfo()),
        tap((res) => (this.regionalInfo = res)),
        switchMap(() => this.getManagerInfo())
      )
      .subscribe((res) => {
        this.loading = false;
        this.managerInfo = res;
      });
  }

  getManagerInfo() {
    return this.storeService.getRegionalOfStoreById(this.store.id);
  }

  getRegionalInfo() {
    return this.storeService.getManagerOfStoreById(this.store.id);
  }

  onStoreEditClick() {
    this.router.navigate([`/store/${this.store.id}/details/edit/info`]);
  }
}
