import { Injectable } from '@angular/core';
import { GlbService } from '../glb/glb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public glb: GlbService) { }

  /* login() {
    localStorage.setItem('access', 'true');
  }

  logout() {
    localStorage.removeItem('access');
  } */

  isLoggedIn() {
    return localStorage.getItem('wanderlustpay-sesion') ? true : false;
    /* return localStorage.getItem('access') === 'true'; */
  }
}