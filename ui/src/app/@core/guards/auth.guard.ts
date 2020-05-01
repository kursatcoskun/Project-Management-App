import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import snq from 'snq';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = snq(() => localStorage.getItem('token'), null);
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
