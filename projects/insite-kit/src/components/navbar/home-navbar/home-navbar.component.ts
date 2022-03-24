import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '@stomp/stompjs';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { NotificationMessageService } from 'projects/insite-kit/src/service/notification-message-service/notification-message.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { StompWebSocketService } from 'projects/insite-kit/src/service/stomp/stomp-websocket.service';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
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
    private readonly jwt: JwtService,
    private readonly stompService: StompWebSocketService,
    private readonly notificationMessageService: NotificationMessageService,
    @Inject(ViewContainerRef) viewContainerRef
  ) {
    notificationMessageService.setRootViewContainerRef(viewContainerRef);
  }

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

    this.stompService.activate();
    this.stompService
      .watch('/notifications')
      .pipe(
        map((res: Message) => JSON.parse(res.body)),
        filter((res: Notification) => this.isNotificationReceiver(res)),
        tap((res) => this.notificationMessageService.triggerNotification(res)),
        switchMap(() => this.getNotifications(this.getParams())),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.notificationCount = res.length));
  }

  ngOnDestroy() {
    this.stompService.deactivate();
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

  isNotificationReceiver(res: Notification) {
    return (
      this.jwt.getRequiredUserId() === res.receiverId ||
      WebRole[this.jwt.getRequiredWebRole()] === WebRole.ADMIN
    );
  }
}
