import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME = 'token';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private router: Router) {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(): Date {
    const exp = this.getDecodedToken().exp;

    if (exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(exp);
    return date;
  }

  isTokenExpired(): boolean {
    const date = this.getTokenExpirationDate();
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  isAuthenticated() {
    if (localStorage.getItem(TOKEN_NAME) != null) {
      if (this.isTokenExpired()) {
        localStorage.removeItem(TOKEN_NAME);
        return false;
      }
      return true;
    }
  }

  getDecodedToken() {
    return jwt_decode(this.getToken());
  }

  get(value: any, tokenOverride?: string) {
    const reviewToken = tokenOverride ? tokenOverride : this.getToken();
    const decoded = jwt_decode(reviewToken);
    return decoded[value];
  }

  isUserLoggedIn() {
    return localStorage.getItem(TOKEN_NAME) !== null;
  }

  logOut() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['login']);
  }
}
