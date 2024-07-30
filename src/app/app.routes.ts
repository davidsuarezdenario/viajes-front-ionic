import { Routes } from '@angular/router';
/* import { LoginGuardGuard } from "./core/guards/loginGuard/login-guard.guard"; */
import { authGuard } from "./shared/guards/auth.guard";
import { canLeaveAuthGuard } from "./shared/guards/can-leave-auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', },
  { path: '', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  { path: 'payment', loadComponent: () => import('./pages/payment/payment.page').then((m) => m.PaymentPage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage), canActivate: [authGuard] },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage), canActivate: [authGuard] },
  { path: 'restore-pass', loadComponent: () => import('./pages/restore-pass/restore-pass.page').then(m => m.RestorePassPage), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage), canActivate: [canLeaveAuthGuard] },
  { path: 'booking-one', loadComponent: () => import('./pages/booking-one/booking-one.page').then(m => m.BookingOnePage), canActivate: [canLeaveAuthGuard] },
  { path: 'booking-two', loadComponent: () => import('./pages/booking-two/booking-two.page').then(m => m.BookingTwoPage), canActivate: [canLeaveAuthGuard] }
];
