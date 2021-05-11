import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url-service/url.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private readonly urlService: UrlService) {}

  getUserDataByName(id: number) {
    return this.http.post(`${this.urlService.getAPIUrl()}/user/details`, [
      id,
    ]);
  }
}
