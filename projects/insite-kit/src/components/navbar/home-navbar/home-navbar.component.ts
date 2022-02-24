import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Access, App, Feature, WebRole } from '../../../models/common.model';
import { JwtService } from '../../../service/jwt-service/jwt.service';

@Component({
  selector: 'ik-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit, OnDestroy {
  @Input() titleName = "Marc's";
  name: string;
  notificationCount = 0;

  Feature = Feature;
  Application = App;
  Access = Access;
  destroy = new Subject();
  notificationAccess: boolean;

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.authService
      .hasAccess(
        this.Application.GLOBAL,
        this.Feature.NOTIFICATION,
        this.Access.READ
      )
      .pipe(
        tap((access) => (this.notificationAccess = access)),
        filter((access) => access),
        switchMap(() => this.getNotifications(this.getParams())),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.notificationCount = res.length));
  }

  ngOnDestroy(): void {
    this.destroy.next();
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
