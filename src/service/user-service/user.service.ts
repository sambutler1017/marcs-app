import { Injectable } from '@angular/core';
import { User } from 'projects/insite-kit/src/lib/models/user.model';
import { RequestService } from 'projects/insite-kit/src/lib/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly BASE_USER_PATH = 'api/user-app/users';
  constructor(private request: RequestService) {}

  /**
   * Get a list of users based on the given request
   *
   * @param params to filter on
   * @returns User object
   */
  getUsers(params?: Map<string, string>): Observable<User[]> {
    return this.request.get<User[]>(this.BASE_USER_PATH, params);
  }

  /**
   * Get a user for a given user id
   *
   * @param params user id for the user to get
   * @returns User object
   */
  getUserById(id: number): Observable<User[]> {
    return this.request.get<User[]>(
      this.BASE_USER_PATH,
      new Map<string, string>().set('id', id.toString())
    );
  }

  createUser(user: User) {
    return this.request.post<User>(this.BASE_USER_PATH, user);
  }
}
