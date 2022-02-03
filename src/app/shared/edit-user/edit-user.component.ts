import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {
  @ViewChild('managerChangeModal') managerChangeModal: ModalComponent;

  loading = true;
  destroy = new Subject();
  userId: number;
  userUpdating: User;
  disableWebRoleUpdate = false;

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.user),
        tap((res) => (this.userId = res.id)),
        tap(
          () =>
            (this.disableWebRoleUpdate =
              Number(this.jwt.get('userId')) === this.userId)
        ),
        takeUntil(this.destroy)
      )
      .subscribe((user) => {
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
    // if (this.checkUserRoleManager(user)) {
    //   this.managerChangeModal.open();
    // } else {
    this.userProfileSave(user);
    // }
  }

  userProfileSave(user: User) {
    this.loading = true;
    this.userService.updateUserProfileById(this.userId, user).subscribe(
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

  checkUserRoleManager(user: User): boolean {
    return (
      user.webRole === WebRole[WebRole.STORE_MANAGER] &&
      this.userUpdating.webRole !== WebRole[WebRole.STORE_MANAGER]
    );
  }

  onManagerConfirm() {
    console.log('User profile updated and manager change complete!');
    this.managerChangeModal.close();
  }
}
