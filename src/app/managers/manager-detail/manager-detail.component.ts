import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/lib/assets/translations/managers/en.json';
import {
  Access,
  Application,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/lib/models/common.model';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-manager-detail',
  templateUrl: './manager-detail.component.html',
  styleUrls: ['./manager-detail.component.scss'],
})
export class ManagerDetailComponent implements OnInit {
  userData: User;
  managerJson = json;
  infoEditRoute: string;

  WebRole = WebRole;
  Feature = Feature;
  Application = Application;
  Access = Access;

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params: any = this.activeRoute.params;
    this.infoEditRoute = `/managers/details/${params.value.id}/edit/info`;

    this.userService
      .getUserById(params.value.id)
      .subscribe((res) => (this.userData = res[0]));
  }

  onMoveClick() {
    this.router.navigate(['/managers/move-manager']);
  }
}
