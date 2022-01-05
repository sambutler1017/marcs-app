import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { default as json } from 'projects/insite-kit/src/assets/translations/application/en.json';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { BaseComponent } from 'src/app/shared/base-component/base-class.component';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
})
export class ProfileOverviewComponent extends BaseComponent implements OnInit {
  user: User;
  webRole = WebRole;
  applications: string[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly router: Router,
    private readonly location: Location,
    public notificationService: NotificationService
  ) {
    super(notificationService);
  }

  ngOnInit() {
    this.userService
      .getUserById(this.jwtService.get('userId'))
      .subscribe((v) => {
        this.user = v;
        this.triggerNotificationUpdate();
      });
    this.generateApplicationString();
  }

  generateApplicationString() {
    const apps: string[] = this.jwtService.get('apps');
    const translations = Object.values(json)[0];
    apps.forEach((v) => this.applications.push(translations[v]));
  }

  onEditProfile() {
    this.router.navigate(['/profile/edit']);
  }

  onResetPassword() {
    this.router.navigate(['/profile/update-password']);
  }

  onBackClick() {
    this.location.back();
  }
}
