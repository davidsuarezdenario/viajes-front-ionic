import { Routes } from '@angular/router';
import { LoginGuardGuard } from "./core/guards/loginGuard/login-guard.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', },
  { path: '', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  { path: 'payment', loadComponent: () => import('./pages/payment/payment.page').then((m) => m.PaymentPage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage), canActivate: [LoginGuardGuard]},
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage) },
  { path: 'restore-pass', loadComponent: () => import('./pages/restore-pass/restore-pass.page').then( m => m.RestorePassPage) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage) },
  { path: 'booking-one', loadComponent: () => import('./pages/booking-one/booking-one.page').then( m => m.BookingOnePage) },
  { path: 'booking-two', loadComponent: () => import('./booking-two/booking-two.page').then( m => m.BookingTwoPage) }
];
