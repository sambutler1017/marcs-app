import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/service/store-service/store.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  @ViewChild('managerChangeModal') managerChangeModal: ModalComponent;

  loading = true;
  disableSave = false;
  currentUpdatedInfo: User;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly storeService: StoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loading = false;
  }

  onCancelClick() {
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

  userProfileSave(user: User) {
    this.userService.addUser(user).subscribe({
      next: (res) => {
        this.router.navigate([`/user/${res.id}/details`]);
        this.popupService.success('User Successfully created!');
      },
      error: () => {
        this.popupService.error('User could not be created!');
        this.loading = false;
      },
    });
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

  getAddUserObservable(user: User) {
    return this.userService.addUser(user);
  }

  onManagerConfirm() {
    this.loading = true;
    let newUser: User = null;
    this.managerChangeModal.close();

    this.getAddUserObservable(this.currentUpdatedInfo)
      .pipe(
        tap((res) => (newUser = res)),
        switchMap((newUser) =>
          this.storeService.updateStoreManagerOfStore(
            newUser.id,
            newUser.storeId
          )
        )
      )
      .subscribe({
        next: () => {
          this.managerChangeModal.close();
          this.router.navigate([`/user/${newUser.id}/details`]);
          this.popupService.success('User Successfully created!');
        },
        error: () => {
          this.resetStatus();
          this.managerChangeModal.close();
          this.popupService.error('User could not be created at this time!');
        },
      });
  }

  checkUserRoleManager(user: User): boolean {
    return user.webRole === WebRole[WebRole.STORE_MANAGER];
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
