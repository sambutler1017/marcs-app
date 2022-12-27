import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PopupService } from '../../popup/popup.service';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'ik-user-notification',
  template: ``,
})
export class UserNotificationComponent implements OnInit, OnDestroy {
  private readonly USER_SOCKET_URL = '/queue/user/notification';
  destroy = new Subject<void>();

  constructor(
    private readonly subscriptionService: SubscriptionService,
    readonly popupService: PopupService
  ) {}

  ngOnDestroy() {
    this.destroy.next();
  }

  ngOnInit() {
    this.subscriptionService.init();
    return this.subscriptionService
      .listen(this.USER_SOCKET_URL, true)
      .pipe(
        tap((res) => this.popupService.showNotification(res)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
