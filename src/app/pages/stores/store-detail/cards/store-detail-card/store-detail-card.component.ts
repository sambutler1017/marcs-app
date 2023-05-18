import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  AppFeature,
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

  regionalManagerInfo: User;
  managerInfo: User;

  loading = true;
  canEdit = false;

  Feature = AppFeature;
  Access = Access;
  editIcon = faPenToSquare;

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
        switchMap(() => this.getRegionalManagerInfo()),
        tap((res) => (this.regionalManagerInfo = res.body)),
        switchMap(() => this.getManagerInfo()),
        tap((res) => (this.managerInfo = res.body))
      )
      .subscribe(() => (this.loading = false));
  }

  getRegionalManagerInfo() {
    return this.storeService.getRegionalManagerOfStoreById(this.store.id);
  }

  getManagerInfo() {
    return this.storeService.getManagerOfStoreById(this.store.id);
  }

  onStoreEditClick() {
    this.router.navigate([`/store/${this.store.id}/details/edit/info`]);
  }
}
