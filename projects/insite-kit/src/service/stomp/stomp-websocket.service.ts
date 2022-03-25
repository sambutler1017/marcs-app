import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  listen(userId: number): Observable<Notification> {
    return super
      .watch(`${this.SOCKET_URL}/${userId}`)
      .pipe(map((res: Message) => JSON.parse(res.body)));
  }
}
