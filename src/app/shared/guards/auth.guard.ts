import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/guards/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {

  let authService = new AuthService()
  let router = inject(Router)
  
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};