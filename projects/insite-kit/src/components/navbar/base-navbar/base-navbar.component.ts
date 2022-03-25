import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/models/common.model';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationMessageService } from 'projects/insite-kit/src/service/notification-message/notification-message.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { StompWebSocketService } from 'projects/insite-kit/src/service/stomp/stomp-websocket.service';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'ik-app-navbar',
  template: '',
})
export class BaseNavbarComponent implements OnInit, OnDestroy {
  notificationCount = 0;
  destroy = new Subject();

  Feature = Feature;
  Application = App;
  Access = Access;
  notificationAccess: boolean;

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
    private readonly stompService: StompWebSocketService,
    private readonly notificationMessageService: NotificationMessageService,
    @Inject(ViewContainerRef) viewContainerRef
  ) {
    notificationMessageService.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
    this.notificationUpdates();
    this.validateNotificationAccess();
    this.listenToWebSocket();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onWaffleClick() {
    this.router.navigate(['home']);
  }

  onBellClick() {
    this.router.navigate(['/notification']);
  }
  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  onLogOutClick() {
    this.jwt.logOut();
  }

  getNotifications(params?: Map<string, string[]>) {
    return this.notificationService.getNotifications(params);
  }

  validateNotificationAccess() {
    this.authService
      .hasAccess(
        this.Application.GLOBAL,
        this.Feature.NOTIFICATION,
        this.Access.READ
      )
      .pipe(
        tap((access) => (this.notificationAccess = access)),
        filter((access) => access),
        tap(() => this.notificationService.triggerNotificationUpdate()),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  notificationUpdates() {
    this.notificationService
      .notificationChange()
      .pipe(
        switchMap(() => this.getNotifications(this.getParams())),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.notificationCount = res.length));
  }

  listenToWebSocket() {
    this.stompService.activate();
    return this.stompService
      .listen(this.jwt.getRequiredUserId())
      .pipe(
        tap((res) => this.notificationMessageService.triggerNotification(res)),
        tap(() => this.notificationService.triggerNotificationUpdate()),
        takeUntil(this.destroy)
      )
      .subscribe();
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
