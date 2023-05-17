import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
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
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly storeService: StoreService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.user.body),
        tap((res) => (this.userId = res.id)),
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

  onSaveClick(user: User) {
    if (this.isUserRoleChangeStoreManager(user)) {
      this.checkStoreHasManager(user);
    } else {
      this.saveUserProfile(user);
    }
  }

  checkStoreHasManager(user: User) {
    this.storeService
      .getManagerOfStoreById(user.storeId)
      .pipe(map((res) => res.body !== null))
      .subscribe((hasManager) => {
        this.currentUpdatedInfo = user;
        if (hasManager) {
          this.managerChangeModal.open();
        } else {
          this.saveUserProfile(user);
        }
      });
  }

  onManagerChangeConfirm() {
    this.managerChangeModal.close();
    this.saveUserProfile(this.currentUpdatedInfo);
  }

  saveUserProfile(user: User) {
    this.loading = true;
    this.userService.updateUserProfileById(this.userId, user).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('User Successfully updated!');
      },
      error: () => {
        this.resetStatus();
        this.popupService.error('User could not be updated at this time!');
      },
    });
  }

  isUserRoleChangeStoreManager(user: User): boolean {
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
