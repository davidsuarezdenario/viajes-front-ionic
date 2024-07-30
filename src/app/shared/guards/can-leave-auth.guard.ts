import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/guards/auth.service';
import { inject } from '@angular/core';

export const canLeaveAuthGuard: CanActivateFn = (route, state) => {
  
  let authService = inject(AuthService);
  let router = inject(Router);

  console.log(`canLeaveAuthGuard: ${authService.isLoggedIn()}`)
  if (authService.isLoggedIn()) {
    /* router.navigate([state.url]); */
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}