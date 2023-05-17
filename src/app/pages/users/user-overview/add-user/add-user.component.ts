import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { map } from 'rxjs/operators';
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

  onSaveClick(user: User) {
    if (this.isNewUserRoleStoreManager(user)) {
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
    this.userService.addUser(user).subscribe({
      next: (newUser) => {
        this.router.navigate([`/user/${newUser.id}/details`]);
        this.popupService.success('User Successfully created!');
      },
      error: () => {
        this.resetStatus();
        this.popupService.error('User could not be created at this time!');
      },
    });
  }

  isNewUserRoleStoreManager(user: User): boolean {
    return user.webRole === WebRole[WebRole.STORE_MANAGER];
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
