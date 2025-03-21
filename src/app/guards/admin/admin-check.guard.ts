import {CanActivate, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class adminCheckGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();

    if (!token) {
      console.error('Aucun token trouvé. Redirection vers la page de connexion.');
      return this.router.createUrlTree(['/login']);
    }
    return this.authService.getUserInfos().pipe(
      map(user => {
        const isAdmin = user.role === 'ADMIN';
        if (!isAdmin) {
          console.error('Accès refusé : rôle non ADMIN. Redirection vers la page d’accueil.');
          return this.router.createUrlTree(['/']);
        }
        return true;
      }),
      catchError(() => {
        console.error('Erreur lors de la récupération des infos utilisateur. Redirection vers la connexion.');
        return of(this.router.createUrlTree(['/login']));
      })
    );

  }
};
