import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/stores/en.json';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { StoreService } from 'projects/insite-kit/src/lib/service/store-service/store-service.service';

@Component({
  selector: 'ik-stores-overview',
  templateUrl: './stores-overview.component.html',
})
export class StoresOverviewComponent implements OnInit {
  storeJson = json;
  outputEventColumns = ['id', 'regionalId'];
  excludedColumns = ['id', 'regionalId', 'managerId'];
  dataLoader: Store[];

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit() {
    let params: Map<string, string> = new Map<string, string>();
    params.set('regionalId', '1');
    this.storeService.getStores(params).subscribe((res: Store[]) => this.dataLoader = res);
  }

  handleClick(event: any) {
    this.router.navigate([`/managers/details/${event.id}`]);
  }
}
