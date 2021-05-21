import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
   * @returns observable of the passed in object
   */
  get<T>(url: string, params?: Map<string, string>): Observable<T> {
    let endpoint = `${this.urlService.getAPIUrl()}/${url}?`;
    if (params) {
      params.forEach((value, key) => {
        endpoint = `${endpoint}${key}=${value}&`;
      });
    }
    console.log(endpoint.slice(0, -1));
    return this.http.get<T>(endpoint.slice(0, -1));
  }

  /**
   * Post the given body to the passed in endpoint
   *
   * @param url to post body too
   * @param body to be posted to the endpoint
   * @returns observable of the passed in object
   */
  post<T>(url: string, body?: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
