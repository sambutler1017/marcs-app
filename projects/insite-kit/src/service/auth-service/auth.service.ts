import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthToken } from '../../models/auth-token.model';
import { Access, Application, Feature } from '../../models/common.model';
import { JwtService } from '../jwt-service/jwt.service';
import { RequestService } from '../request-service/request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private request: RequestService, private jwt: JwtService) {}

  /**
   * Authenticate a user and get a token for the user
   *
   * @param username of the user
   * @param password associated to the user
   * @returns
   */
  authenticate(email: string, password: string): Observable<AuthToken> {
    return this.request
      .post<AuthToken>('authenticate', {
        email,
        password,
      })
      .pipe(tap((u) => this.jwt.setToken(`Bearer: ${(u as any).token}`)));
  }

  /**
   * Determines if a user has access to a given feature for the given level
   *
   * @param app to check feature on
   * @param key to check level access on
   * @param level type of the feature
   * @returns boolean
   */
  hasAccess(
    app: Application | string,
    key: Feature | string,
    level: Access | 'c' | 'r' | 'u' | 'd' = Access.READ
  ): Observable<boolean> {
    const feature: [{}] = this.jwt.get('access')[app];
    let access = [];

    if (feature) {
      access = feature
        .filter((f) => Object.keys(f)[0] === key)
        .map((v) => Object.values(v)[0]);
    } else {
      return of(false);
    }

    return of(this.determineAccess(access, level));
  }

  /**
   * Determine the access of the array and level
   *
   * @param access array of the user feature access
   * @param level to see they have access
   * @returns boolean
   */
  private determineAccess(
    access: string[],
    level: Access | 'c' | 'r' | 'u' | 'd'
  ): boolean {
    if (access.length === 0) return false;
    return access[0].includes(level);
  }
}
