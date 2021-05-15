import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtService } from '../jwt-service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwt: JwtService) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (!this.jwt.isValidToken()) {
      if (next.routeConfig.path !== 'login') {
        this.router.navigate(['/login']);
        return false;
      }
    } else if (next.routeConfig.path === 'login') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
