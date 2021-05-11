import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConstantsService as Globals } from '../../common/global-constants.service';
import { JwtService } from '../jwt-service/jwt-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private jwt: JwtService) {}

  userDataResult: any;

  authenticate(username, password) {
    return this.httpClient
      .post(Globals.AUTHENTICATION_URL, { username, password })
      .pipe(map((u) => this.jwt.setToken(`Bearer ${(u as any).token}`)));
  }
}
