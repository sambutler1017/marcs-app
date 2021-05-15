import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtService } from '../jwt-service/jwt.service';
import { UrlService } from '../url-service/url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private jwt: JwtService,
    private readonly urlService: UrlService
  ) {}

  userDataResult: any;

  authenticate(username: string, password: string) {
    return this.httpClient
      .post(`${this.urlService.getAPIUrl()}/authenticate`, {
        username,
        password,
      })
      .pipe(map((u) => this.jwt.setToken(`Bearer: ${(u as any).token}`)));
  }
}
