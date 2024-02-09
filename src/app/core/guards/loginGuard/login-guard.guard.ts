import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  async canActivate(): Promise<boolean> {
    if (await this.apiService.verifySesion()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
