import { Routes } from '@angular/router';
import { isAuthenticated } from './auth/auth.guard';
import { ProtectedComponent } from './protected/protected.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const APP_ROUTES: Routes = [
  {
    component: ProtectedComponent,
    path: 'protected',
    canActivate: [isAuthenticated],
  },
  {
    component: UnauthorizedComponent,
    path: 'unauthorized',
  },
];
