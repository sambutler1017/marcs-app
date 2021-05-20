import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/stores/en.json';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt.service';
import { StoreService } from 'src/service/store-service/store-service.service';

@Component({
  selector: 'ik-stores-overview',
  templateUrl: './stores-overview.component.html',
})
export class StoresOverviewComponent implements OnInit {
  storeJson = json;
  outputEventColumns = ['id', 'regionalId'];
  excludedColumns = ['regionalId', 'managerId'];
  dataLoader: Store[];

  constructor(
    private storeService: StoreService,
    private router: Router,
    private jwt: JwtService
  ) {}

  ngOnInit() {
    let params: Map<string, string> = new Map<string, string>();
    params.set('regionalId', this.jwt.get('userId'));
    this.storeService
      .getStores(params)
      .subscribe((res) => (this.dataLoader = res));
  }

  handleClick(event: any) {
    console.log(event);
    this.router.navigate([`/stores/details/${event.id}`]);
  }
}
