import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WebRole } from '../../models/common.model';
import { User } from '../../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class StompWebSocketService extends RxStomp {
  private readonly SOCKET_URL = '/topic/notifications';

  /**
   * This will listen to the websocket url for any request and rely
   * them to the logged in user.
   *
   * @param user The user currently logged in
   * @returns Observable of the caught Notification object.
   */
  listen(user: User): Observable<Notification> {
    return super.watch(this.SOCKET_URL).pipe(
      map((res: Message) => JSON.parse(res.body)),
      filter((res: Notification) => this.isNotificationReceiver(res, user))
    );
  }

  /**
   * Checks to see if the user that is logged in should get the notification.
   *
   * @param res The response from the websocket
   * @param user The user currently logged in
   * @returns Boolean determining if the user should get the notification.
   */
  isNotificationReceiver(res: Notification, user: User): boolean {
    return (
      user.id === res.receiverId || user.webRole === WebRole[WebRole.ADMIN]
    );
  }
}
