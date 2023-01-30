import { Injectable } from '@angular/core';
import { RxStomp, RxStompState } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { JwtService } from '../jwt-service/jwt.service';
import { UrlService } from '../url-service/url.service';
import { STOMP_SOCKET_CONFIG } from './stomp.config';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService extends RxStomp {
  private RECONNECT_ATTEMPTS = 0;

  destroy = new Subject<void>();

  constructor(
    private readonly jwt: JwtService,
    private readonly urlService: UrlService
  ) {
    super();
  }

  /**
   * Initialize the socket connection. This will only initialize if the connection
   * is not already established.
   */
  init() {
    if (!this.active) {
      this.reconnectCheck();
      this.configure(STOMP_SOCKET_CONFIG);
      this.configure({
        brokerURL: `${this.urlService.getSocketAPIUrl()}?${this.jwt.getToken()}`,
      });
      this.activate();
    }
  }

  /**
   * Destroys the subscriptions of the STOMP connections.
   */
  terminate() {
    if (this.active) {
      this.deactivate();
    }

    this.RECONNECT_ATTEMPTS = 0;
    this.destroy.next();
  }

  /**
   * This will listen to the websocket url for any request and show it to the
   * provided user.
   *
   * @param destination What socket path to listen too.
   * @param userSession Determines if the connection is unique to the user.
   * @returns Observable of the caught Notification object.
   */
  listen(des: string, userSession: boolean = false): Observable<Notification> {
    return this.subscriptionSession().pipe(
      switchMap((session) =>
        super
          .watch(this.buildSocketPath(des, session, userSession))
          .pipe(map((res: Message) => JSON.parse(res.body)))
      )
    );
  }

  /**
   * Builds out the socket path for the subscription. If the connection desires that it
   * be user specific then it will append the users unique sesion id to the
   * subscription call.
   *
   * @param des Where the subscription should take place.
   * @param ses The unique user session id.
   * @returns String of the built socket path.
   */
  private buildSocketPath(des: string, uuid: string, userSes: boolean): string {
    return userSes ? `${des}-${uuid}` : des;
  }

  /**
   * Gets the session id for the user. This will be a UUID that will
   * only belong to this user logged in.
   *
   * @returns Observable of the session id.
   */
  private subscriptionSession() {
    return this.serverHeaders$.pipe(map((session) => session['user-name']));
  }

  /**
   * Keeps track of the reconnect count. If the count exceeds 5 attempts then
   * it will stomp the reconnect process.
   */
  private reconnectCheck() {
    this.connectionState$
      .pipe(
        filter((res) => res === RxStompState.CONNECTING),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        if (this.RECONNECT_ATTEMPTS >= 5) {
          this.deactivate();
        }
        this.RECONNECT_ATTEMPTS++;
      });

    this.connectionState$
      .pipe(
        filter((res) => res === RxStompState.OPEN),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.RECONNECT_ATTEMPTS = 0));
  }
}
