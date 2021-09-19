import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
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

  constructor(
    private userService: UserService,
    private router: Router,
    private jwt: JwtService
  ) {}

  ngOnInit() {
    this.getWebRoleParams();
    this.getUsers(this.getWebRoleParams()).subscribe(
      (res) => (this.dataLoader = res)
    );
  }

  handleClick(event: any) {
    this.router.navigate([`/user/details/${event.id}`]);
  }

  onAddManager() {
    this.router.navigate(['/user/add-user']);
  }

  getUsers(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }

  getWebRoleParams() {
    const currentUserRole = WebRole[this.jwt.get('webRole')];
    const roles = Object.keys(WebRole)
      .map((key) => WebRole[key])
      .filter(
        (value) =>
          typeof value === 'string' && WebRole[value] <= currentUserRole
      ) as string[];
    return new Map<string, string[]>().set('webRole', roles);
  }

  onSearch(value: any) {
    if (value.trim() === '') {
      this.getUsers(this.getWebRoleParams()).subscribe(
        (res) => (this.dataLoader = res)
      );
    } else {
      this.getUsers(this.generateSearchParams(value)).subscribe(
        (res) => (this.dataLoader = res)
      );
    }
  }

  generateSearchParams(value: any) {
    return new Map<string, [string]>()
      .set('firstName', [value])
      .set('lastName', [value])
      .set('storeId', [value])
      .set('storeName', [value]);
  }
}
