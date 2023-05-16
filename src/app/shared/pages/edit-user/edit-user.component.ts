import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject, of } from 'rxjs';
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
  destroy = new Subject<void>();
  userId: number;
  userUpdating: User;
  currentUpdatedInfo: User;
  disableWebRoleUpdate = false;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly storeService: StoreService,
    private readonly route: ActivatedRoute,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.user.body),
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
    this.resetStatus();
    this.location.back();
  }

  onModalClose() {
    this.resetStatus();
    this.managerChangeModal.close();
  }

  onSaveClick(user: User) {
    if (this.checkUserRoleManager(user)) {
      this.disableSave = true;
      this.checkStoreHasManager(user);
    } else {
      this.loading = true;
      this.userProfileSave(user);
    }
  }

  checkStoreHasManager(user: User) {
    this.storeService
      .getManagerOfStoreById(user.storeId)
      .pipe(
        map((res) => res.body !== null),
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
    this.getUserSaveObservable(user).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('User Successfully updated!');
      },
      error: () => {
        this.popupService.error('User could not be updated at this time!');
        this.loading = false;
      },
    });
  }

  onManagerConfirm() {
    this.loading = true;
    this.managerChangeModal.close();

    this.getUserSaveObservable(this.currentUpdatedInfo)
      .pipe(
        switchMap(() =>
          this.storeService.updateStoreManagerOfStore(
            this.userId,
            this.currentUpdatedInfo.storeId
          )
        )
      )
      .subscribe({
        next: () => {
          this.managerChangeModal.close();
          this.onCancelClick();
          this.popupService.success('User Successfully updated!');
        },
        error: () => {
          this.resetStatus();
          this.managerChangeModal.close();
          this.popupService.error('User could not be updated at this time!');
        },
      });
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

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
