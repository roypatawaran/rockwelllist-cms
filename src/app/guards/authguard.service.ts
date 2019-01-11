import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public _router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = sessionStorage.getItem('token');
    const account = sessionStorage.getItem('account');

    if(token != null && account != null)
        return true;
    else
        this._router.navigate(['/login']);
  }
}