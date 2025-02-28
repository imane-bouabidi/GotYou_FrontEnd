import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRequiredGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
