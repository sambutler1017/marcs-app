import { Injectable } from '@angular/core';
import { Store } from 'projects/insite-kit/src/lib/models/store.model';
import { RequestService } from 'projects/insite-kit/src/lib/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private readonly requestService: RequestService) {}

  /**
   * Get a list of stores for the given request
   *
   * @param params to filter request on
   * @returns observable of the returned request
   */
  getStores(params?: Map<string, string>): Observable<Store[]> {
    return this.requestService.get<Store[]>('api/store-app/stores', params);
  }
}
