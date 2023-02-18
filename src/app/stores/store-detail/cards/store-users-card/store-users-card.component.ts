import { Component, Input } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-store-users-card',
  templateUrl: './store-users-card.component.html',
})
export class StoreUsersCardComponent {
  @Input() store: Store;

  managementRoles: any[] = [
    WebRole[WebRole.STORE_MANAGER],
    WebRole[WebRole.ASSISTANT_MANAGER],
    WebRole[WebRole.CUSTOMER_SERVICE_MANAGER],
  ];

  storeUsersDataloader: any;
  loading = true;

  constructor(private readonly userService: UserService) {
    this.storeUsersDataloader = (params) => this.getStoreUserDataloader();
  }

  getStoreUserDataloader() {
    return this.userService.getUsers(
      new Map<string, string[]>()
        .set('storeId', [this.store.id])
        .set('webRole', this.managementRoles)
    );
  }
}
