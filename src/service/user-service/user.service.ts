import { Injectable } from '@angular/core';
import { PasswordUpdate } from 'projects/insite-kit/src/models/password-update.model';
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
   * This will get the user object of the current user that is logged in.
   *
   * @returns User object of the current user.
   */
  getCurrentUser(): Observable<User> {
    return this.request.get<User>(`${this.BASE_USER_PATH}/current-user`);
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
   * This will get the User object of the regional that is in charge of that store.
   *
   * @param storeId The store id to get the regional for.
   * @returns User object of the regional.
   */
  getRegionalOfStoreById(storeId: string): Observable<User> {
    return this.request.get<User>(`${this.BASE_USER_PATH}/regional/${storeId}`);
  }

  /**
   * This will check to see if the email exists already. Used to see if a user can create
   * an account with the email they have chosen.
   *
   * @param email The email to check.
   * @returns Boolean of the status of the email.
   */
  doesEmailExist(email: string): Observable<boolean> {
    return this.request.get<boolean>(
      `${this.BASE_USER_PATH}/check-email?email=${email}`
    );
  }

  /**
   * This will create a user for the given object, but will default to a user web role object.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  createUser(user: User): Observable<User> {
    return this.request.post<User>(this.BASE_USER_PATH, user);
  }

  /**
   * This will create a user for the given object.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  addUser(user: User): Observable<User> {
    return this.request.post<User>(`${this.BASE_USER_PATH}/add-user`, user);
  }

  /**
   * This will send a forgot password link to the user for the given email so that
   * they can reset their password.
   *
   * @param email The email that needs to have the password reset
   * @returns User object of the user that is being reset, if exists.
   */
  forgotPassword(email: string): Observable<User> {
    return this.request.post<User>(
      `${this.BASE_USER_PATH}/forgot-password`,
      email
    );
  }

  /**
   * This will update the current user information for the given user object.
   *
   * @param user The user information that needs updated.
   * @returns User object with the updated user object.
   */
  updateUserProfile(user: User): Observable<User> {
    return this.request.put<User>(`${this.BASE_USER_PATH}`, user);
  }

  /**
   * Update the given user data for the given user id
   *
   * @param id of the user to update.
   * @param user The user object to update
   * @returns User object
   */
  updateUserProfileById(id: number, user: User): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_PATH}/${id.toString()}`,
      user
    );
  }

  /**
   * This will update the current users password for the given password update
   * object
   *
   * @param passUpdate The object that contains the current password and new password.
   * @returns The user object of the user that was updated.
   */
  updateUserPassword(passUpdate: PasswordUpdate): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_PATH}/password`,
      passUpdate
    );
  }

  /**
   * This will update the users password for the given password update
   * object and user id.
   *
   * @param userId The user that needs updated.
   * @param passUpdate The object that contains the current password and new password.
   * @returns The user object of the user that was updated.
   */
  updateUserPasswordById(
    userId: number,
    passUpdate: PasswordUpdate
  ): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_PATH}/password${userId.toString()}`,
      passUpdate
    );
  }

  /**
   * This will reset the users password for the given password update object
   *
   * @param passUpdate The password update object the password needs to be.
   * @returns User Object of the user that was updated.
   */
  resetUserPassword(passUpdate: PasswordUpdate): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_PATH}/password/reset`,
      passUpdate
    );
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
