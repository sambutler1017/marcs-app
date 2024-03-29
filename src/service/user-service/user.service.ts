import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { PasswordUpdate } from 'projects/insite-kit/src/models/password-update.model';
import {
  Application,
  User,
  UserStatus,
} from 'projects/insite-kit/src/models/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly BASE_PATH = 'api/users';
  readonly BASE_STATUS_PATH = this.BASE_PATH + '/status';
  readonly BASE_CREDENTIALS_PATH = this.BASE_PATH + '/credentials';

  constructor(
    private readonly request: RequestService,
    private readonly jwt: JwtService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of users based on the given request
   *
   * @param params to filter on
   * @returns User object,
   */
  getUsers(params?: Map<string, string[]>): Observable<HttpResponse<User[]>> {
    return this.request.get<User[]>(this.BASE_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedRole = this.commonService.getFormattedRole(u.webRole);
          u.formattedName = this.commonService.getFormattedName(u);
        })
      )
    );
  }

  /**
   * This will get the user object of the current user that is logged in.
   *
   * @returns User object of the current user.
   */
  getCurrentUser(): Observable<HttpResponse<User>> {
    return this.request.get<User>(`${this.BASE_PATH}/current-user`);
  }

  /**
   * Get a user for a given user id
   *
   * @param params user id for the user to get
   * @returns User object
   */
  getUserById(id: number): Observable<HttpResponse<User>> {
    return this.request.get<User>(`${this.BASE_PATH}/${id.toString()}`);
  }

  /**
   * Gets the users applications that they have access too for the given user id.
   *
   * @param id The id of the user to get applications for.
   * @returns List of Application object
   */
  getUserAppsById(id: number): Observable<HttpResponse<Application[]>> {
    return this.request.get<Application[]>(
      `${this.BASE_PATH}/${id}/application-access`
    );
  }

  /**
   * This will get the User object of the regional manager that is in charge of that store.
   *
   * @param storeId The store id to get the regional manager for.
   * @returns User object of the regional manager.
   */
  getRegionalManagerOfStoreById(
    storeId: string
  ): Observable<HttpResponse<User>> {
    return this.request.get<User>(
      `${this.BASE_PATH}/regional-manager/${storeId}`
    );
  }

  /**
   * This will check to see if the email exists already. Used to see if a user can create
   * an account with the email they have chosen.
   *
   * @param email The email to check.
   * @returns Boolean of the status of the email.
   */
  doesEmailExist(email: string): Observable<HttpResponse<boolean>> {
    return this.request.get<boolean>(
      `${this.BASE_PATH}/check-email?email=${email}`
    );
  }

  /**
   * This will create a user for the given object, but will default to a user web role object.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  createUser(user: User): Observable<User> {
    return this.request.post<User>(this.BASE_PATH, user);
  }

  /**
   * This will create a user for the given object.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  addUser(user: User): Observable<User> {
    return this.request.post<User>(`${this.BASE_PATH}/add-user`, user);
  }

  /**
   * This will send a forgot password link to the user for the given email so that
   * they can reset their password.
   *
   * @param email The email that needs to have the password reset
   * @returns User object of the user that is being reset, if exists.
   */
  forgotPassword(email: string): Observable<User> {
    return this.request.post<User>(`${this.BASE_PATH}/forgot-password`, email);
  }

  /**
   * This will update the current user information for the given user object.
   *
   * @param user The user information that needs updated.
   * @returns User object with the updated user object.
   */
  updateUserProfile(user: User): Observable<User> {
    return this.request.put<User>(`${this.BASE_PATH}`, user);
  }

  /**
   * Update the given user data for the given user id
   *
   * @param id of the user to update.
   * @param user The user object to update
   * @returns User object
   */
  updateUserProfileById(id: number, user: User): Observable<User> {
    return this.request.put<User>(`${this.BASE_PATH}/${id.toString()}`, user);
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
      `${this.BASE_CREDENTIALS_PATH}/password`,
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
      `${this.BASE_CREDENTIALS_PATH}/password/${userId.toString()}`,
      passUpdate
    );
  }

  /**
   * This will update the user status of the user.
   *
   * @param userId The user to be updated.
   * @param status The status to update the user too.
   * @returns The user object that needs returned.
   */
  updateUserStatus(
    userId: number,
    dataStatus: UserStatus
  ): Observable<UserStatus> {
    return this.request.put<UserStatus>(
      `${this.BASE_STATUS_PATH}/${userId}`,
      dataStatus
    );
  }

  /**
   * This will reset the users password for the given password update object.
   *
   * @param passUpdate The password update object the password needs to be.
   * @returns User Object of the user that was updated.
   */
  resetUserPassword(passUpdate: PasswordUpdate): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_CREDENTIALS_PATH}/password/reset`,
      passUpdate
    );
  }

  /**
   * Delete the user associated to the given id.
   *
   * @param id of the user to be deleted.
   */
  deleteUser(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * Checks to see if the given user id has access to the application.
   *
   * @param id The user id to check.
   * @returns Boolean if the user has app access or not.
   */
  hasAppAccess(id: number): Observable<boolean> {
    return this.getUserById(id).pipe(map((res) => res.body.appAccess));
  }

  /**
   * This will get what users the user is able to see.
   */
  getUserAccessMap() {
    const userRole: number = Number(WebRole[this.jwt.get('webRole')]);

    // CUSTOMER_SERVICE_MANAGER, ASSISTANT_MANAGER, STORE_MANAGER, DISTRICT_MANAGER, REGIONAL
    if ([4, 5, 6, 7, 8].includes(userRole)) {
      return new Map<string, string[]>().set('accountStatus', ['APPROVED']);
    }

    // EMPLOYEE, PART_TIME_EMPLOYEE, CORPORATE_USER, SITE_ADMIN, ADMIN, and other
    return new Map<string, string[]>();
  }

  /**
   * Helper method to determine if the currently logged in user is able to edit the current web role.
   *
   * @param editableUserRole The role to check if editable.
   * @returns Boolean based on if the user can edit the role or not.
   */
  canEditUser(editableUserRole: WebRole): boolean {
    const userRole: number = Number(WebRole[this.jwt.get('webRole')]);
    const editableUserRoleId: number = Number(WebRole[editableUserRole]);

    // MANAGER editing an EMPLOYEE
    if (6 === userRole && [1, 2].includes(editableUserRoleId)) {
      return true;
    }

    // DISTRICT_MANAGER or REGIONAL_MANAGER editing user with role of STORE_MANAGER or lower
    if ([7, 8].includes(userRole) && editableUserRoleId < 7) {
      return true;
    }

    // SITE_ADMIN
    if (9 === userRole && editableUserRoleId < 9) {
      return true;
    }

    // ADMIN can edit anyone, but themselves
    if (10 === userRole && editableUserRoleId < 10) {
      return true;
    }

    //EMPLOYEE, PART_TIME_EMPLOYEE or other can't edit anyone
    return false;
  }

  /**
   * Helper method to determine if the currently logged in user is able to edit the current web role.
   *
   * @param editableUserRole The role to check if editable.
   * @returns Boolean based on if the user can edit the role or not.
   */
  getAllowedRolesToCreate(): string[] {
    const userRole: number = Number(WebRole[this.jwt.get('webRole')]);

    // STORE_MANAGER editing an EMPLOYEE
    if (6 === userRole) {
      return [WebRole[WebRole.EMPLOYEE].toString()];
    }

    // DISTRICT_MANAGER or REGIONAL_MANAGER editing user with role of STORE_MANAGER or lower
    if ([7, 8].includes(userRole)) {
      return [
        WebRole[WebRole.ASSISTANT_MANAGER].toString(),
        WebRole[WebRole.CUSTOMER_SERVICE_MANAGER].toString(),
        WebRole[WebRole.STORE_MANAGER].toString(),
        WebRole[WebRole.EMPLOYEE].toString(),
        WebRole[WebRole.PART_TIME_EMPLOYEE].toString(),
      ];
    }

    // SITE_ADMIN and ADMIN can edit anyone
    if ([9, 10].includes(userRole)) {
      return Object.keys(WebRole)
        .map((key) => WebRole[key])
        .filter(
          (value) => typeof value === 'string' && WebRole[value] < userRole
        ) as string[];
    }

    //EMPLOYEE, PART_TIME_EMPLOYEE or other can't create anyone
    return [];
  }
}
