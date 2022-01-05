import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Access, App, Feature, WebRole } from '../../../models/common.model';
import { JwtService } from '../../../service/jwt-service/jwt.service';

@Component({
  selector: 'ik-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
  @Input() titleName = "Marc's";
  name: string;
  notificationCount = 0;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.getNotifications(this.getParams()).subscribe(
      (res) => (this.notificationCount = res.length)
    );
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  onLogOutClick() {
    this.jwt.logOut();
  }

  onBellClick() {
    this.router.navigate(['/notification']);
  }

  getNotifications(params?: Map<string, string[]>) {
    return this.notificationService.getNotifications(params);
  }

  getParams() {
    const currentUserRole = WebRole[this.jwt.get('webRole')];

    if (Number(currentUserRole) >= WebRole.SITE_ADMIN.valueOf()) {
      return new Map().set('read', false);
    } else {
      return new Map()
        .set('receiverId', this.jwt.get('userId'))
        .set('read', false);
    }
  }
}
