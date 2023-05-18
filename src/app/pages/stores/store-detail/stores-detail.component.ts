import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  AppFeature,
} from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { StoreService } from 'src/service/store-service/store.service';
import { DeleteStoreModalComponent } from './modals/delete-store-modal/delete-store-modal.component';

@Component({
  selector: 'app-stores-detail',
  templateUrl: './stores-detail.component.html',
})
export class StoresDetailComponent implements OnInit {
  @ViewChild(DeleteStoreModalComponent)
  deleteStoreModal: DeleteStoreModalComponent;

  store: Store;
  loading = true;

  Feature = AppFeature;
  Access = Access;

  constructor(
    private activeRoute: ActivatedRoute,
    private readonly storeService: StoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    const params: any = this.activeRoute.params;
    this.storeService.getStoreById(params.value.id).subscribe((res) => {
      this.loading = false;
      this.store = res.body;
    });
  }

  onBackClick() {
    this.router.navigate(['/store']);
  }
}
