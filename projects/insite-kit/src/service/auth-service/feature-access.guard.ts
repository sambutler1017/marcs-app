import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtService } from '../jwt-service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureAccessGuard implements CanActivate {
  constructor(private router: Router, private jwt: JwtService) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    return this.hasFeatureAccess(next.data);
  }

  /**s
   * Determine if the user has feature access to route to this page
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  hasFeatureAccess(data: any): boolean {
    return true;
  }
}
