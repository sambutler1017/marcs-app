import { Injectable } from '@angular/core';
import { Vacation } from 'projects/insite-kit/src/lib/models/vacation.model';
import { RequestService } from 'projects/insite-kit/src/lib/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VacationService {
    readonly BASE_USER_PATH = 'api/vacation-app/vacations';
    constructor(private request: RequestService) { }

    /**
     * Get the vacations for the currently logged in user.
     *
     * @returns User object
     */
    getCurrentUserVacations(params?: Map<string, string>): Observable<Vacation[]> {
        return this.request.get<Vacation[]>(this.BASE_USER_PATH);
    }

    /**
     * Gets a vacation object for the given id
     *
     * @param params The id of the vacation to get.
     * @returns Vacation object
     */
    getVacationById(id: number): Observable<Vacation> {
        return this.request.get<Vacation>(`${this.BASE_USER_PATH}/${id.toString()}`);
    }

    /**
     * Get vacations for the given user id.
     *
     * @param id of the user to update.
     * @returns User object
     */
    getVacationsByUserId(id: number): Observable<Vacation> {
        return this.request.get<Vacation>(`${this.BASE_USER_PATH}/${id.toString()}/user`);
    }
}
