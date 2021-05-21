import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Access } from '../../models/common.model';
import { RequestService } from '../request-service/request.service';

/**
 * Common Request Service
 *
 * @author Sam Butler
 * @since Dec 15, 2020
 */
@Injectable({
  providedIn: 'root',
})
export class FeatureAccessService {
  constructor(private readonly request: RequestService) {}

  /**
   * Get the feature access for the given user and application
   *
   * @param url to call
   * @param params params to add to endpoint
   */
  hasFeatureAccess(
    app: string,
    feature: string,
    type: Access
  ): Observable<boolean> {
    const params = new Map<string, string>();
    params.set('app', app);
    params.set('feature', feature);
    params.set('type', type.valueOf());

    return this.request.get<boolean>('api/feature/access', params);
  }
}
