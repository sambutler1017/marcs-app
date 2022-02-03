import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-overview.component.html',
})
export class UserOverviewComponent extends BaseComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;

  userJson = json;
  outputEventColumns = ['id'];
  excludedColumns = [
    'id',
    'email',
    'appAccess',
    'webRole',
    'hireDate',
    'insertDate',
    'password',
  ];
  columns = ['firstName', 'lastName', 'storeId', 'storeName'];
  dataLoader: User[];

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private userService: UserService,
    private router: Router,
    private jwt: JwtService,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.getUsers(this.getParams()).subscribe((res) => {
      this.dataLoader = res;
      this.triggerNotificationUpdate();
    });
  }

  handleClick(event: any) {
    this.router.navigate([`/user/${event.id}/details`]);
  }

  onAddUser() {
    this.router.navigate(['/user/add-user']);
  }

  getUsers(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }

  onSearch(value: any) {
    if (value.trim() === '') {
      this.getUsers(this.getParams()).subscribe(
        (res) => (this.dataLoader = res)
      );
    } else {
      this.getUsers(this.generateSearchParams(value)).subscribe(
        (res) => (this.dataLoader = res)
      );
    }
  }

  getParams() {
    return this.userService.getUserAccessMap();
  }

  generateSearchParams(value: any) {
    return this.getParams().set('search', value);
  }
}
