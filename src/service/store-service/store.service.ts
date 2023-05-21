import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly BASE_PATH = 'api/stores';

  constructor(
    private readonly requestService: RequestService,
    private readonly jwt: JwtService
  ) {}

  /**
   * Get a list of stores for the given request
   *
   * @param params to filter request on
   * @returns observable of the returned request
   */
  getStores(params?: Map<string, string[]>): Observable<HttpResponse<Store[]>> {
    return this.requestService.get<Store[]>(this.BASE_PATH, params);
  }

  /**
   * Get a list of stores for the given request
   *
   * @param params to filter request on
   * @returns observable of the returned request
   */
  getStoresAllowedToAccess(): Observable<HttpResponse<Store[]>> {
    const userRole: number = Number(WebRole[this.jwt.get('webRole')]);
    let params = new Map<string, string[]>();

    // CUSTOMER_SERVICE_MANAGER, ASSISTANT_MANAGER, STORE_MANAGER
    if ([4, 5, 6].includes(userRole)) {
      params.set('managerId', [this.jwt.getRequiredUserId().toString()]);
    }

    // DISTRICT_MANAGER, REGIONAL_MANAGER
    if ([7, 8].includes(userRole)) {
      params.set('regionalManagerId', [
        this.jwt.getRequiredUserId().toString(),
      ]);
    }

    // EMPLOYEE, PART_TIME_EMPLOYEE
    if ([1, 2].includes(userRole)) {
      params.set('id', [this.jwt.get('storeId')]);
    }

    return this.requestService.get<Store[]>(this.BASE_PATH, params);
  }

  /**
   * Get the store for the given store id.
   *
   * @param id The id of the store to get
   * @returns observable of the returned request
   */
  getStoreById(id: string): Observable<HttpResponse<Store>> {
    return this.requestService.get<Store>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * Get the regional manager of the passed in store ID.
   *
   * @param storeId Id of the store to get the regional manager for.
   * @return The regional manager of that store
   * @throws Exception
   */
  getRegionalManagerOfStoreById(
    storeId: string
  ): Observable<HttpResponse<User>> {
    return this.requestService.get<User>(
      `${this.BASE_PATH}/regional-manager/${storeId}`
    );
  }

  /**
   * Get the manager of the passed in store ID.
   *
   * @param storeId Id of the store to get the maanger for.
   * @return The manager of that store
   * @throws Exception
   */
  getManagerOfStoreById(storeId: string): Observable<HttpResponse<User>> {
    return this.requestService.get<User>(
      `${this.BASE_PATH}/manager/${storeId}`
    );
  }

  /**
   * Update a store information for the given id and store body.
   *
   * @param id The id of the store to be updated.
   * @param store The store object to update to.
   */
  updateStore(id: string, store: Store): Observable<Store> {
    return this.requestService.put<Store>(`${this.BASE_PATH}/${id}`, store);
  }

  /**
   * This will update the store manager of a store for the given user id and store id.
   *
   * @param userId The user id to update the store manager too.
   * @param storeId The store to update the manager at.
   * @returns store object with the updated manager.
   */
  updateStoreManagerOfStore(
    userId: number,
    storeId: string
  ): Observable<Store> {
    return this.requestService.put<Store>(
      `${this.BASE_PATH}/${userId}/manager/${storeId}`
    );
  }

  /**
   * This will update the regional manager of a store for the given user id and store id.
   *
   * @param userId The user id to update the regional manager too.
   * @param storeId The store to update the regional manager at.
   * @returns store object with the updated regional manager.
   */
  updateRegionalManagerOfStore(
    userId: number,
    storeId: string
  ): Observable<Store> {
    return this.requestService.put<Store>(
      `${this.BASE_PATH}/${userId}/regional-manager/${storeId}`
    );
  }

  /**
   * Create a store store body.
   *
   * @param store The store object to update to.
   */
  createStore(store: Store): Observable<Store> {
    return this.requestService.post<Store>(this.BASE_PATH, store);
  }

  /**
   * Delete a store for the given id.
   *
   * @param storeId The id of the store to delete.
   */
  deleteStore(storeId: string): Observable<any> {
    return this.requestService.delete<any>(`${this.BASE_PATH}/${storeId}`);
  }

  /**
   * Checks to see if the currently logged in user is able to edit the store.
   *
   * @param storeId The store Id to check access too.
   * @returns Observable of type boolean.
   */
  canEditStore(storeId: string): Observable<boolean> {
    return this.getStoreById(storeId).pipe(
      switchMap((res) => this.hasEditStoreAccess(res.body))
    );
  }

  /**
   * Checks to see if the logged in user has edit access to the passed in store object.
   *
   * @param store The store to check access for.
   * @returns Boolean confirming if they have access or not.
   */
  hasEditStoreAccess(store: Store): Observable<boolean> {
    return of(
      this.jwt.getRequiredUserId() === store.regionalManagerId ||
        WebRole[this.jwt.getRequiredWebRole()] > WebRole.REGIONAL_MANAGER
    );
  }
}
