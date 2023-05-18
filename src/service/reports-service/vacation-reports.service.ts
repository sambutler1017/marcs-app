import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacationReportsService {
  readonly BASE_PATH = 'api/reports/vacation';

  constructor(private readonly request: RequestService) {}

  /**
   * Generate a user vacation report csv.
   *
   * @param params to filter on
   * @returns User object
   */
  generateUserVacationsReport(params?: Map<string, string[]>): Observable<any> {
    return this.request.download(`${this.BASE_PATH}/generate`, params);
  }
}
