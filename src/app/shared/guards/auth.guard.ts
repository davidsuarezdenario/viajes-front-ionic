import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/guards/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);
  
  console.log(`authGuard: ${authService.isLoggedIn()}`)
  if (authService.isLoggedIn()) {
    /* router.navigate([state.url]); */
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};