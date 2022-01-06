import { Injectable } from '@angular/core';
import { Vacation } from 'projects/insite-kit/src/models/vacation.model';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacationService {
  readonly BASE_VACATION_PATH = 'api/vacation-app/vacations';
  constructor(private request: RequestService) {}

  /**
   * Get the vacations for the given request
   *
   * @returns User object
   */
  getVacations(params?: Map<string, string[]>): Observable<Vacation[]> {
    return this.request.get<Vacation[]>(`${this.BASE_VACATION_PATH}`, params);
  }

  /**
   * Get the vacations for the currently logged in user.
   *
   * @returns User object
   */
  getCurrentUserVacations(): Observable<Vacation[]> {
    return this.request.get<Vacation[]>(
      `${this.BASE_VACATION_PATH}/current-user`
    );
  }

  /**
   * Gets a vacation object for the given id
   *
   * @param params The id of the vacation to get.
   * @returns Vacation object
   */
  getVacationById(id: number): Observable<Vacation> {
    return this.request.get<Vacation>(
      `${this.BASE_VACATION_PATH}/${id.toString()}`
    );
  }

  /**
   * Get vacations for the given user id.
   *
   * @param id of the vacation to get.
   * @returns User object
   */
  getVacationsByUserId(id: number): Observable<Vacation[]> {
    return this.request.get<Vacation[]>(
      `${this.BASE_VACATION_PATH}/${id.toString()}/user`
    );
  }

  /**
   * Create a vacation for the given user.
   *
   * @param userId  The user id to get vacations for.
   * @param vacation The vacation to be inserted.
   * @return {@link List<Vacation>} for the user.
   */
  public createVacation(
    userId: number,
    vacation: Vacation
  ): Observable<Vacation> {
    return this.request.post<Vacation>(
      `${this.BASE_VACATION_PATH}/${userId.toString()}/user`,
      vacation
    );
  }

  /**
   * Create multiple vacations and give them to the desired user file.
   *
   * @param userId   The user id to get vacations for.
   * @param vacations The list of vacations to be inserted.
   * @return {@link Observable<Vacation[]>} for the user.
   */
  public createBatchVacations(
    userId: number,
    vacations: Vacation[]
  ): Observable<Vacation[]> {
    return this.request.post<Vacation[]>(
      `${this.BASE_VACATION_PATH}/${userId.toString()}/user/batch`,
      vacations
    );
  }

  /**
   * Request a vacation to be approved.
   *
   * @param vac The vacation that needs approved
   * @returns Vacation object that was created
   */
  public requestVacation(vac: Vacation): Observable<Vacation> {
    return this.request.post<Vacation>(
      `${this.BASE_VACATION_PATH}/request`,
      vac
    );
  }

  /**
   * Update the status of a vacation by id
   *
   * @param vacId The vacation id that needs to be updated
   * @param vac The vacation object containing the status to update it too.
   * @returns Vacation object with the updated information
   */
  public updateVacationInfo(
    vacId: number,
    vac: Vacation
  ): Observable<Vacation> {
    return this.request.put<Vacation>(
      `${this.BASE_VACATION_PATH}/${vacId}/info`,
      vac
    );
  }

  /**
   * Used to update the dates of a vacation
   *
   * @param id The id of the vacation to be updated.
   * @param vac What to update the vacation info too.
   */
  public updateVacationDatesById(id: number, vac: Vacation) {
    return this.request.put<Vacation>(`${this.BASE_VACATION_PATH}/${id}`, vac);
  }

  /**
   * Deletes all vacations for the currently logged in user.
   *
   * @param userId The user id to get vacations for.
   * @return {@link Observable<any>} for the user.
   */
  public deleteAllCurrentUserVacations(): Observable<any> {
    return this.request.delete<any>(this.BASE_VACATION_PATH);
  }

  /**
   * Get a list of vacations for the given user id.
   *
   * @param id The id for the vacation
   */
  public deleteVacationById(id: number): Observable<any> {
    return this.request.delete<any>(
      `${this.BASE_VACATION_PATH}/${id.toString()}`
    );
  }

  /**
   * Deletes all user vacations for the given user id.
   *
   * @param userId The user id to get vacations for.
   */
  public deleteAllVacationsByUserId(userId: number): Observable<any> {
    return this.request.delete<any>(
      `${this.BASE_VACATION_PATH}/${userId.toString()}/user`
    );
  }
}
