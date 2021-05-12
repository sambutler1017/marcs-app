import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from '../../../projects/insite-kit/src/lib/service/url-service/url.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private readonly urlService: UrlService
  ) {}

  /**
   * Get a list of users based on the given request
   *
   * @param params to filter on
   * @returns User object
   */
  getUser(params?: Map<string, string>): Observable<any> {
    let endpoint = `${this.urlService.getAPIUrl()}/api/user-app/users?`;
    params.forEach((value, key) => {
      endpoint = `${endpoint}${key}=${value}&`;
    });

    return this.http.get(endpoint.slice(0, -1));
  }

  /**
   * Get a user for a given user id
   *
   * @param params user id for the user to get
   * @returns User object
   */
  getUserById(id: number): Observable<any> {
    return this.http.get(
      `${this.urlService.getAPIUrl()}/api/user-app/users?id=${id}`
    );
  }
}
