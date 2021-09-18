import { Injectable } from '@angular/core';
import { User } from 'projects/insite-kit/src/models/user.model';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
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
  getUsers(params?: Map<string, string[]>): Observable<User[]> {
    return this.request.get<User[]>(this.BASE_USER_PATH, params);
  }

  /**
   * Get a user for a given user id
   *
   * @param params user id for the user to get
   * @returns User object
   */
  getUserById(id: number): Observable<User> {
    return this.request.get<User>(`${this.BASE_USER_PATH}/${id.toString()}`);
  }

  /**
   * Update the given user data for the given user id
   *
   * @param id of the user to update.
   * @param user The user object to update
   * @returns User object
   */
  updateUserById(id: number, user: User): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_PATH}/${id.toString()}`,
      user
    );
  }

  /**
   * This will create a user for the given object, but will default to a user web role object.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  createUser(user: User) {
    return this.request.post<User>(this.BASE_USER_PATH, user);
  }

  /**
   * This will create a user for the given object.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  addUser(user: User) {
    return this.request.post<User>(`${this.BASE_USER_PATH}/add-user`, user);
  }
}
