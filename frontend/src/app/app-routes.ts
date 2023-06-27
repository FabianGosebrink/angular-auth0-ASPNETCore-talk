import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './auth/auth.guard';
import { ProtectedComponent } from './protected/protected.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const APP_ROUTES: Routes = [
  {
    component: ProtectedComponent,
    path: 'protected',
    canActivate: [AuthorizationGuard],
  },
  {
    component: UnauthorizedComponent,
    path: 'unauthorized',
  },
];
