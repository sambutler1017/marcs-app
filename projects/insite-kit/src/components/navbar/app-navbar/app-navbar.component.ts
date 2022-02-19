import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ik-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent implements OnInit, OnDestroy {
  @Input() appName: string;
  notificationCount = 0;
  destroy = new Subject();

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.getNotifications(this.getParams())
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => (this.notificationCount = res.length));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  onLogOutClick() {
    this.jwt.logOut();
  }

  onWaffleClick() {
    this.router.navigate(['home']);
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
