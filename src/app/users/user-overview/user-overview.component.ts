import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-overview.component.html',
})
export class UserOverviewComponent implements OnInit {
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
    private jwt: JwtService
  ) {}

  ngOnInit() {
    this.getUsers(this.getParams()).subscribe((res) => (this.dataLoader = res));
  }

  handleClick(event: any) {
    this.router.navigate([`/user/details/${event.id}`]);
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
    let params = this.userService.managersOnlyMap();

    if (params !== null) {
      return params;
    } else {
      params = new Map<string, string[]>();
    }

    const currentUserRole = WebRole[this.jwt.get('webRole')];
    const roles = Object.keys(WebRole)
      .map((key) => WebRole[key])
      .filter(
        (value) => typeof value === 'string' && WebRole[value] < currentUserRole
      ) as string[];

    return params.set('webRole', roles);
  }

  generateSearchParams(value: any) {
    return this.getParams()
      .set('firstName', [value])
      .set('lastName', [value])
      .set('storeId', [value])
      .set('storeName', [value]);
  }
}
