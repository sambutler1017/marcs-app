import { Injectable } from '@angular/core';
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockDatesService {
  readonly BASE_USER_PATH = 'api/block-out-date-app/block-out-dates';

  constructor(private readonly requestService: RequestService) {}

  /**
   * Get a list of block out dates for the given request.
   *
   * @param params to filter request on
   * @returns observable of the returned request
   */
  getBlockOutDates(params?: Map<string, string[]>): Observable<BlockOutDate[]> {
    return this.requestService.get<BlockOutDate[]>(this.BASE_USER_PATH, params);
  }

  /**
   * Get a block out date object by id.
   *
   * @param id The id of the block out date.
   * @returns observable of the returned request
   */
  getBlockOutDateById(id: number): Observable<BlockOutDate> {
    return this.requestService.get<BlockOutDate>(
      `${this.BASE_USER_PATH}/${id}`
    );
  }

  /**
   * Create a block out date for the given object.
   *
   * @param data The object to be created.
   * @returns observable of the created block out date.
   */
  createBlockOutDate(data: BlockOutDate): Observable<BlockOutDate> {
    return this.requestService.post<BlockOutDate>(this.BASE_USER_PATH, data);
  }

  /**
   * Create a block out date for the given object.
   *
   * @param id The id of the block out date to be deleted
   */
  deleteBlockOutDate(id: number): Observable<any> {
    return this.requestService.delete<any>(`${this.BASE_USER_PATH}/${id}`);
  }
}
