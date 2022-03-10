import { Injectable } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { User } from 'projects/insite-kit/src/models/user.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly BASE_STORE_PATH = 'api/store-app/stores';

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
  getStores(params?: Map<string, string[]>): Observable<Store[]> {
    return this.requestService.get<Store[]>(this.BASE_STORE_PATH, params);
  }

  /**
   * Get the store for the given store id.
   *
   * @param id The id of the store to get
   * @returns observable of the returned request
   */
  getStoreById(id: string): Observable<Store> {
    return this.requestService.get<Store>(`${this.BASE_STORE_PATH}/${id}`);
  }

  /**
   * Get the regional of the passed in store ID.
   *
   * @param storeId Id of the store to get the regional for.
   * @return The regional of that store
   * @throws Exception
   */
  getRegionalOfStoreById(storeId: string): Observable<User> {
    return this.requestService.get<User>(
      `${this.BASE_STORE_PATH}/regional/${storeId}`
    );
  }

  /**
   * Get the manager of the passed in store ID.
   *
   * @param storeId Id of the store to get the maanger for.
   * @return The manager of that store
   * @throws Exception
   */
  getManagerOfStoreById(storeId: string): Observable<User> {
    return this.requestService.get<User>(
      `${this.BASE_STORE_PATH}/manager/${storeId}`
    );
  }

  /**
   * Update a store information for the given id and store body.
   *
   * @param id The id of the store to be updated.
   * @param store The store object to update to.
   */
  updateStore(id: string, store: Store): Observable<Store> {
    return this.requestService.put<Store>(
      `${this.BASE_STORE_PATH}/${id}`,
      store
    );
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
      `${this.BASE_STORE_PATH}/${userId}/manager/${storeId}`
    );
  }

  /**
   * This will update the regional of a store for the given user id and store id.
   *
   * @param userId The user id to update the regional too.
   * @param storeId The store to update the regional at.
   * @returns store object with the updated regional.
   */
  updateRegionalOfStore(userId: number, storeId: string): Observable<Store> {
    return this.requestService.put<Store>(
      `${this.BASE_STORE_PATH}/${userId}/regional/${storeId}`
    );
  }

  /**
   * Create a store store body.
   *
   * @param store The store object to update to.
   */
  createStore(store: Store): Observable<Store> {
    return this.requestService.post<Store>(this.BASE_STORE_PATH, store);
  }

  /**
   * Delete a store for the given id.
   *
   * @param storeId The id of the store to delete.
   */
  deleteStore(storeId: string): Observable<any> {
    return this.requestService.delete<any>(
      `${this.BASE_STORE_PATH}/${storeId}`
    );
  }

  /**
   * Checks to see if the currently logged in user is able to edit the store.
   *
   * @param storeId The store Id to check access too.
   * @returns Observable of type boolean.
   */
  canEditStore(storeId: string): Observable<boolean> {
    return this.getStoreById(storeId).pipe(
      map(
        (res) =>
          this.jwt.getRequiredUserId() === res.regionalId ||
          WebRole[this.jwt.getRequiredWebRole()] > WebRole.REGIONAL
      )
    );
  }
}
