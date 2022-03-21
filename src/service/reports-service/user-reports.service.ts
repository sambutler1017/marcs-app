import { Injectable } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserReportsService {
  readonly BASE_USER_PATH = 'api/reports-app/user';

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
    return this.request.download(`${this.BASE_USER_PATH}/generate`, params);
  }

  /**
   * This will get what users the user is able to see.
   */
  getReportAccessMap() {
    const userRole: number = Number(WebRole[this.jwt.get('webRole')]);

    // CORPORATE_USER, SITE_ADMIN, ADMIN
    if ([2, 8, 9].includes(userRole)) {
      return new Map<string, string[]>().set(
        'excludedUserIds',
        this.jwt.get('userId')
      );
    }

    // CUSTOMER_SERVICE_MANAGER, ASSISTANT_MANAGER, STORE_MANAGER
    if ([3, 4, 5].includes(userRole)) {
      return new Map<string, string[]>()
        .set('storeId', this.jwt.get('storeId'))
        .set('excludedUserIds', this.jwt.get('userId'))
        .set('accountStatus', ['APPROVED'])
        .set('webRole', [WebRole[WebRole.EMPLOYEE].toString()]);
    }

    //DISTRICT_MANAGER, REGIONAL
    if ([6, 7].includes(userRole)) {
      return new Map<string, string[]>()
        .set('regionalId', this.jwt.get('userId'))
        .set('excludedUserIds', this.jwt.get('userId'))
        .set('accountStatus', ['APPROVED']);
    }

    // EMPLOYEE and other
    return new Map<string, string[]>().set('id', ['0']);
  }
}
