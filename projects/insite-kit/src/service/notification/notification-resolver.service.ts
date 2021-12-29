import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notification } from '../../models/notification.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationResolverService implements Resolve<any> {
  constructor(private notificationService: NotificationService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Notification> {
    return this.notificationService.getNotificationById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
