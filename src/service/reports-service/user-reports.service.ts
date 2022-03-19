import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserReportsService {
  readonly BASE_USER_PATH = 'api/reports-app/user';

  constructor(private readonly request: RequestService) {}

  /**
   * Generate a user report csv.
   *
   * @param params to filter on
   * @returns User object
   */
  generateUserProfileReport(params?: Map<string, string[]>): Observable<any> {
    return this.request.download(`${this.BASE_USER_PATH}/generate`, params);
  }
}
