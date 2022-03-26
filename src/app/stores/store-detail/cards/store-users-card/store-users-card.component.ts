import { Component, Input, OnInit } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-store-users-card',
  templateUrl: './store-users-card.component.html',
})
export class StoreUsersCardComponent implements OnInit {
  @Input() store: Store;

  managementRoles: any[] = [
    WebRole[WebRole.STORE_MANAGER],
    WebRole[WebRole.ASSISTANT_MANAGER],
    WebRole[WebRole.CUSTOMER_SERVICE_MANAGER],
  ];

  storeUsers: User[];
  loading = true;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getUsers(
        new Map<string, string[]>()
          .set('storeId', [this.store.id])
          .set('webRole', this.managementRoles)
      )
      .subscribe((res) => {
        this.storeUsers = res;
        this.loading = false;
      });
  }
}
