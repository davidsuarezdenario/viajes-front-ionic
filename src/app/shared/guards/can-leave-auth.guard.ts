import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/guards/auth.service';
import { inject } from '@angular/core';

export const canLeaveAuthGuard: CanActivateFn = (route, state) => {
  
  let authService = inject(AuthService);
  let router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
}