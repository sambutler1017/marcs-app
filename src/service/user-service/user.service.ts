import { Injectable } from '@angular/core';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { RequestService } from 'projects/insite-kit/src/lib/service/request-service/request.service';
import { Observable } from 'rxjs';
import { UrlService } from '../../../projects/insite-kit/src/lib/service/url-service/url.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private request: RequestService,
    private readonly urlService: UrlService
  ) {}

  /**
   * Get a list of users based on the given request
   *
   * @param params to filter on
   * @returns User object
   */
  getUser(params?: Map<string, string>): Observable<User[]> {
    return this.request.get<User[]>('api/user-app/users', params);
  }

  /**
   * Get a user for a given user id
   *
   * @param params user id for the user to get
   * @returns User object
   */
  getUserById(id: number): Observable<User[]> {
    return this.request.get<User[]>(
      'api/user-app/users',
      new Map<string, string>().set('id', id.toString())
    );
  }
}
