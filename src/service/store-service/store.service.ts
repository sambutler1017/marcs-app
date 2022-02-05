import { Injectable } from '@angular/core';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly BASE_STORE_PATH = 'api/store-app/stores';

  constructor(private readonly requestService: RequestService) {}

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
}
