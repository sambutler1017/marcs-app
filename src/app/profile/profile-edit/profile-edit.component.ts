import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'projects/insite-kit/src/models/user.model';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  loading = true;
  userId: number;
  userUpdating: User;
  destroy = new Subject();

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe((user) => {
      this.userUpdating = user;
      this.loading = false;
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
          this.toastService.success('Profile Successfully updated!');
        },
        (err) => {
          this.toastService.error('Profile could not be updated at this time!');
          this.loading = false;
        }
      );
  }
}
