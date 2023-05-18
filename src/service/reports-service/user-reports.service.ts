import { Injectable } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserReportsService {
  readonly BASE_PATH = 'api/reports/user';

  constructor(
    private readonly request: RequestService,
    private readonly jwt: JwtService
  ) {}

  /**
   * Generate a user report csv.
   *
   * @param params to filter on
   * @returns User object
   */
  generateUserProfileReport(params?: Map<string, string[]>): Observable<any> {
    return this.request.download(`${this.BASE_PATH}/generate`, params);
  }
}
