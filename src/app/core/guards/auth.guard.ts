import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly _authenticationService: AuthenticationService, private readonly _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let programAccess = true;
      const allowedUser = route?.data?.['allowedUser']
      let userRoles = JSON.parse(localStorage.getItem('user_roles'))
      if(allowedUser && !userRoles?.includes(allowedUser) ) {
        programAccess = false;
      }
    return programAccess && this.isUserLoggedIn() && environment.config === 'VSK';
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const nameSpace = route.data['nameSpace']
      let programs = JSON.parse(localStorage.getItem('program_access'))
      let programAccess = true;
      if(nameSpace && programs && programs.indexOf(nameSpace) == -1) {
        programAccess = false
        console.log(nameSpace, ' is not accessible')
      }
      return programAccess && this.isUserLoggedIn();
  }

  isUserLoggedIn(): boolean {
    if (!this._authenticationService.isUserLoggedIn()) {
      this._router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
