import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly BASE_PATH = 'api/notification-app/notifications';

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
}
