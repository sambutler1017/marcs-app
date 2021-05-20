import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/managers/en.json';
import { WebRole } from 'projects/insite-kit/src/lib/models/common.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { JwtService } from 'projects/insite-kit/src/lib/service/jwt-service/jwt.service';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-manager-content',
  templateUrl: './manager-overview.component.html',
  styleUrls: ['./manager-overview.component.scss'],
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
  ) {}

  ngOnInit() {
    this.userService
      .getUser(
        new Map<string, string>()
          .set('webRole', WebRole.MANAGER.toUpperCase())
          .set('regionalId', this.jwt.get('userId'))
      )
      .subscribe((res: User[]) => {
        this.dataLoader = res;
      });
  }

  handleClick(event: any) {
    this.router.navigate([`/managers/details/${event.id}`]);
  }

  onAddManager() {
    this.router.navigate(['/managers/add-manager']);
  }
}
