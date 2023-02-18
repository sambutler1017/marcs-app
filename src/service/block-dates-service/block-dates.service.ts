import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockOutDate } from 'projects/insite-kit/src/models/BlockOutDate.model';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  getBlockOutDates(
    params?: Map<string, string[]>
  ): Observable<HttpResponse<BlockOutDate[]>> {
    return this.requestService.get<BlockOutDate[]>(this.BASE_USER_PATH, params);
  }

  /**
   * Get a block out date object by id.
   *
   * @param id The id of the block out date.
   * @returns observable of the returned request
   */
  getBlockOutDateById(id: number): Observable<HttpResponse<BlockOutDate>> {
    return this.requestService.get<BlockOutDate>(
      `${this.BASE_USER_PATH}/${id}`
    );
  }

  isBlockOutDate(
    startDate: Date | string,
    endDate: Date | string
  ): Observable<BlockOutDate> {
    return this.getBlockOutDates().pipe(
      map((b) =>
        b.body.filter(
          (block) =>
            this.isDateBetween(block.startDate, startDate, block.endDate) ||
            this.isDateBetween(block.startDate, endDate, block.endDate)
        )
      ),
      map((res) => (res.length > 0 ? res[0] : null))
    );
  }

  /**
   * Update a block out date for the given object.
   *
   * @param id the id of the block out date to update.
   * @param data The object to be created.
   * @returns observable of the created block out date.
   */
  updateBlockOutDateById(
    id: number,
    data: BlockOutDate
  ): Observable<BlockOutDate> {
    return this.requestService.put<BlockOutDate>(
      `${this.BASE_USER_PATH}/${id}`,
      data
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

  isDateBetween(
    leftThreshold: Date | string,
    d: Date | string,
    rightThreshold: Date | string
  ) {
    return leftThreshold <= d && d <= rightThreshold;
  }
}
