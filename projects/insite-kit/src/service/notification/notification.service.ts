import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly BASE_PATH = 'api/notification-app/notifications';
  private notificationListener: Subject<any> = new Subject<any>();

  constructor(private readonly requestService: RequestService) {}

  /**
   * Get a list of notifications for the given request
   *
   * @param params to filter request on
   * @returns observable of the returned request
   */
  getNotifications(params?: Map<string, string[]>): Observable<Notification[]> {
    return this.requestService.get<Notification[]>(this.BASE_PATH, params);
  }

  /**
   * This will get the notification for the given id.
   *
   * @param id The id of the notificaiton to get.
   * @returns Notification observable
   */
  getNotificationById(id: number): Observable<Notification> {
    return this.requestService.get<Notification>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * This will mark the notification as read for the given id.
   *
   * @param id The id of the notitificaiton to read.
   * @returns Notification object that was read.
   */
  markNotificationRead(id: number): Observable<Notification> {
    return this.requestService.put<Notification>(
      `${this.BASE_PATH}/${id}/read`
    );
  }

  notificationChange() {
    return this.notificationListener.asObservable();
  }

  notificationObserver() {
    this.notificationListener.next();
  }
}
