import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store.service';
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
  currentUpdatedInfo: User;
  disableWebRoleUpdate = false;
  modalLoading = false;

  constructor(
    private location: Location,
    private toastService: ToastrService,
    private userService: UserService,
    private readonly storeService: StoreService,
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

  onModalClose() {
    this.loading = false;
    this.managerChangeModal.close();
  }

  onSaveClick(user: User) {
    this.loading = true;
    if (this.checkUserRoleManager(user)) {
      this.checkStoreHasManager(user);
    } else {
      this.userProfileSave(user);
    }
  }

  checkStoreHasManager(user: User) {
    this.storeService
      .getManagerOfStoreById(user.storeId)
      .pipe(
        map((res) => res !== null),
        catchError(() => of(false))
      )
      .subscribe((hasManager) => {
        this.currentUpdatedInfo = user;
        if (hasManager) {
          this.managerChangeModal.open();
        } else {
          this.onManagerConfirm();
        }
      });
  }

  userProfileSave(user: User) {
    this.getUserSaveObservable(user).subscribe(
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

  onManagerConfirm() {
    this.modalLoading = true;

    this.getUserSaveObservable(this.currentUpdatedInfo)
      .pipe(
        switchMap((res) =>
          this.storeService.updateStoreManagerOfStore(
            this.userId,
            this.currentUpdatedInfo.storeId
          )
        )
      )
      .subscribe(
        (res) => {
          this.modalLoading = false;
          this.managerChangeModal.close();
          this.onCancelClick();
          this.toastService.success('User Successfully updated!');
        },
        (err) => {
          this.modalLoading = false;
          this.managerChangeModal.close();
          this.toastService.error('User could not be updated at this time!');
        }
      );
  }

  getUserSaveObservable(user: User) {
    return this.userService.updateUserProfileById(this.userId, user);
  }

  checkUserRoleManager(user: User): boolean {
    return (
      user.webRole === WebRole[WebRole.STORE_MANAGER] &&
      this.userUpdating.webRole !== WebRole[WebRole.STORE_MANAGER]
    );
  }
}
