import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'ik-general-notification',
  template: ``,
})
export class GeneralNotificationComponent implements OnInit, OnDestroy {
  private readonly GENERAL_SOCKET_URL = '/topic/general/notification';
  destroy = new Subject<void>();

  constructor(private readonly subscriptionService: SubscriptionService) {}

  ngOnDestroy() {
    this.destroy.next();
  }

  ngOnInit() {
    this.subscriptionService.init();
    return this.subscriptionService
      .listen(this.GENERAL_SOCKET_URL)
      .pipe(
        // tap((res) => this.popupService.showNotification(res)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
