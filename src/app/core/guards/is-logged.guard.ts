import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth/auth.service';

export const isLoggedGuard: CanActivateFn = (route, state) => {

  let authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.user() == null) {
    return true;
  }

  router.navigate(['/home'])
  return false;

}
