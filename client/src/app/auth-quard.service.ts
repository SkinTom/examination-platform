import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthQuardService implements CanActivate {

  isUserLoggedIn: boolean;
  routeURL: string;

  constructor(private authService: AuthService, private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    this.authService.loginStatus.subscribe(data => {
      this.isUserLoggedIn = data;
    })

    return new Promise((resolve, reject) => {
      if(!(this.isUserLoggedIn) && this.routeURL !== '/login') {
        this.routeURL = '/login';
        this.router.navigate(['/login'], {
          queryParams: {
            return: 'login'
          }
        });

        return resolve(false);
      } else {
        this.routeURL = this.router.url;

        return resolve(true);
      }
    });
  }
}
