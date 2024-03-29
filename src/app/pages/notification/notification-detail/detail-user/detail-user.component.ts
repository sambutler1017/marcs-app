import { Component, Input } from '@angular/core';
import { AccountStatus, User } from 'projects/insite-kit/src/models/user.model';
import { iif, of, switchMap } from 'rxjs';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
})
export class NotificationDetailUserComponent {
  @Input() userData: User;

  constructor(private readonly userService: UserService) {}

  process(status: any) {
    return this.userService
      .updateUserStatus(this.userData.id, {
        accountStatus: status,
        appAccess: true,
      })
      .pipe(switchMap(() => this.deleteDeniedUser(status)));
  }

  deleteDeniedUser(status: any) {
    return iif(
      () => status === AccountStatus.DENIED,
      this.userService.deleteUser(this.userData.id),
      of(null)
    );
  }
}
