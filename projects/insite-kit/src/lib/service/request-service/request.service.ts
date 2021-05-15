import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url-service/url.service';

/**
 * Common Request Service
 *
 * @author Sam Butler
 * @since Dec 15, 2020
 */
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private readonly urlService: UrlService,
    private readonly http: HttpClient
  ) {}

  /**
   * Get request service that will add the given parameters provided
   * and call the given url.
   *
   * @param url to call
   * @param params params to add to endpoint
   */
  get<T>(url: string, params?: Map<string, string>) {
    let endpoint = `${this.urlService.getAPIUrl()}/${url}?`;
    params.forEach((value, key) => {
      endpoint = `${endpoint}${key}=${value}&`;
    });

    return this.http.get<T>(endpoint);
  }
}
