import { Component, Inject, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { NotificationMessageService } from 'projects/insite-kit/src/service/notification-message/notification-message.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { StompWebSocketService } from 'projects/insite-kit/src/service/stomp/stomp-websocket.service';
import { JwtService } from '../../../service/jwt-service/jwt.service';
import { BaseNavbarComponent } from '../base-navbar/base-navbar.component';

@Component({
  selector: 'ik-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent extends BaseNavbarComponent {
  @Input() titleName = "Marc's";

  constructor(
    router: Router,
    notificationService: NotificationService,
    authService: AuthService,
    jwt: JwtService,
    stompService: StompWebSocketService,
    notificationMessageService: NotificationMessageService,
    @Inject(ViewContainerRef) viewContainerRef
  ) {
    super(
      router,
      notificationService,
      authService,
      jwt,
      stompService,
      notificationMessageService,
      viewContainerRef
    );
  }
}
