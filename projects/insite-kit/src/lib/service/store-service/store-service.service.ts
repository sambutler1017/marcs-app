import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url-service/url.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(
    private http: HttpClient,
    private readonly urlService: UrlService
  ) {}

  getStores(params?: Map<string, string>) {
    let endpoint = `${this.urlService.getAPIUrl()}/api/store-app/stores?`;
    params.forEach((value, key) => {
      endpoint = `${endpoint}${key}=${value}&`;
    });

    return this.http.get(endpoint.slice(0, -1));
  }
}
