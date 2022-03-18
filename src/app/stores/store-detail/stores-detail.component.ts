import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { StoreService } from 'src/service/store-service/store.service';
import { DeleteStoreModalComponent } from './modals/delete-store-modal/delete-store-modal.component';

@Component({
  selector: 'ik-stores-detail',
  templateUrl: './stores-detail.component.html',
})
export class StoresDetailComponent implements OnInit {
  @ViewChild(DeleteStoreModalComponent)
  deleteStoreModal: DeleteStoreModalComponent;

  storeInfo: Store;
  loading = true;

  Feature = Feature;
  Application = App;
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
      this.storeInfo = res;
    });
  }

  onBackClick() {
    this.router.navigate(['/store/overview']);
  }
}
