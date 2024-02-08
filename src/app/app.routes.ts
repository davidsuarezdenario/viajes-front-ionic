import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage), },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage) },
  { path: 'restore-pass', loadComponent: () => import('./pages/restore-pass/restore-pass.page').then( m => m.RestorePassPage) }
];
