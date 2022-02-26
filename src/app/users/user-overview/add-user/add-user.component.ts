import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
    private readonly toastService: ToastrService,
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
    this.userService.addUser(user).subscribe(
      (res) => {
        this.router.navigate([`/user/${res.id}/details`]);
        this.toastService.success('User Successfully created!');
      },
      (err) => {
        this.toastService.error('User could not be created!');
        this.loading = false;
      }
    );
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
    this.managerChangeModal.close();

    this.getAddUserObservable(this.currentUpdatedInfo)
      .pipe(
        switchMap((newUser) =>
          this.storeService.updateStoreManagerOfStore(
            newUser.id,
            newUser.storeId
          )
        )
      )
      .subscribe(
        (res) => {
          this.managerChangeModal.close();
          this.router.navigate([`/user/${res.id}/details`]);
          this.toastService.success('User Successfully created!');
        },
        (err) => {
          this.resetStatus();
          this.managerChangeModal.close();
          this.toastService.error('User could not be created at this time!');
        }
      );
  }

  checkUserRoleManager(user: User): boolean {
    return user.webRole === WebRole[WebRole.STORE_MANAGER];
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
