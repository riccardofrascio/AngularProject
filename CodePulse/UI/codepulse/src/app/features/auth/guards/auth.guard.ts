import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import jwt_decode, { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  let token = cookieService.get('Authorization');
  
  if(token) {
    token = token.replace('Bearer', '');
    const user = authService.getLoggedUser();
    const decodedToken: any = jwtDecode(token);
    const exipationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    if(exipationDate < currentTime) {
      authService.logOut();
      return router.createUrlTree(['/login'], {queryParams: { returnUrl: state.url}});
    } else {//controllo il ruolo
      if (user?.roles.includes('Writer')) {
        return true;
      } else {
        alert('Unauthorized');
        return router.createUrlTree(['/'], {queryParams: { returnUrl: state.url}});;
      }
    }
  } else {
    return router.createUrlTree(['/'], {queryParams: { returnUrl: state.url}});
  }
  
};
