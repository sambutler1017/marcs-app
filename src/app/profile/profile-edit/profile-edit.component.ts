import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'projects/insite-kit/src/models/user.model';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent extends BaseComponent
  implements OnInit, OnDestroy {
  loading = true;
  userId: number;
  userUpdating: User;
  destroy = new Subject();

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe((user) => {
      this.userUpdating = user;
      this.loading = false;
      this.triggerNotificationUpdate();
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(user: User) {
    this.loading = true;

    this.userService
      .updateUserProfile(user)
      .pipe(switchMap(() => this.authService.reauthenticate()))
      .subscribe(
        () => {
          this.onCancelClick();
          this.toastService.success('User Successfully updated!');
        },
        (err) => {
          this.toastService.error('User could not be updated at this time!');
          this.loading = false;
        }
      );
  }
}
