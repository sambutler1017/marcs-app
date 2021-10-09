import { Injectable } from '@angular/core';
import { Application, User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly BASE_USER_PATH = 'api/user-app/user-profile';
  constructor(
    private readonly request: RequestService,
    private readonly jwt: JwtService
  ) {}

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
   * Gets the users applications that they have access too for the given user id.
   *
   * @param id The id of the user to get applications for.
   * @returns List of Application object
   */
  getUserAppsById(id: number): Observable<Application[]> {
    return this.request.get<Application[]>(
      `${this.BASE_USER_PATH}/${id}/application-access`
    );
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

  /**
   * Delete the user associated to the given id.
   *
   * @param id of the user to be deleted.
   */
  deleteUser(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_USER_PATH}/${id}`);
  }

  /**
   * If the user has mangersOnly set. The will only see their managers at the stores they own.
   * This feature is really only for regionals incase they don't want to see everyone else's managers.
   *
   * @returns Map with the regionalId set.
   */
  managersOnlyMap() {
    return this.jwt.get('managersOnly')
      ? new Map<string, string[]>().set('regionalId', this.jwt.get('userId'))
      : null;
  }
}
