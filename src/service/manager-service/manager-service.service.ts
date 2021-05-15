import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../../../projects/insite-kit/src/lib/service/jwt-service/jwt.service';
import { UrlService } from '../../../projects/insite-kit/src/lib/service/url-service/url.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(
    private http: HttpClient,
    private jwt: JwtService,
    private readonly urlService: UrlService
  ) {}

  getManagers() {
    return this.http.post(`${this.urlService.getAPIUrl()}/managers/overview`, [
      this.jwt.get('user_id'),
    ]);
  }
  getManagerDetail(id: number) {
    return this.http.get(
      `${this.urlService.getAPIUrl()}/managers/detail/${id}`
    );
  }
}
