import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'app-manager-stores-card',
  templateUrl: './manager-stores-card.component.html',
  styleUrls: ['./manager-stores-card.component.scss'],
})
export class ManagerStoresCardComponent implements OnInit, OnDestroy {
  @Input() managerId: number;

  destroy = new Subject<void>();
  stores: any[];
  loading = true;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit() {
    this.loading = true;
    this.storeService
      .getStores(new Map().set('regionalId', this.managerId))
      .subscribe((res) => {
        this.stores = res.body;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
