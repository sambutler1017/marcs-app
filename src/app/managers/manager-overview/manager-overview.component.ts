import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/managers/en.json';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-manager-content',
  templateUrl: './manager-overview.component.html'
})
export class ManagerOverviewComponent implements OnInit {
  managerJson = json;
  outputEventColumns = ['id'];
  excludedColumns = [
    'id',
    'email',
    'storeRegion',
    'username',
    'appAccess',
    'webRole',
    'hireDate',
    'insertDate',
    'password',
  ];
  dataLoader: User[];

  constructor(
    private userService: UserService,
    private router: Router,
    private jwt: JwtService
  ) { }

  ngOnInit() {
    this.getUsers(
      new Map<string, string>().set('regionalId', this.jwt.get('userId'))
    ).subscribe((res) => (this.dataLoader = res));
  }

  handleClick(event: any) {
    this.router.navigate([`/manager/details/${event.id}`]);
  }

  onAddManager() {
    this.router.navigate(['/manager/add-manager']);
  }

  getUsers(params?: Map<string, string>) {
    return this.userService.getUsers(params);
  }

  onSearch(value: any) {
    if (value.trim() === '') {
      this.getUsers(
        new Map<string, string>().set('regionalId', this.jwt.get('userId'))
      ).subscribe((res) => (this.dataLoader = res));
    } else {
      this.getUsers(this.generateSearchParams(value)).subscribe(
        (res) => (this.dataLoader = res)
      );
    }
  }

  generateSearchParams(value: any) {
    return new Map<string, string>()
      .set('regionalId', this.jwt.get('userId'))
      .set('firstName', value)
      .set('lastName', value)
      .set('storeId', value)
      .set('storeName', value);
  }
}
