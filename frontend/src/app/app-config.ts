import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { authInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { APP_ROUTES } from './app-routes';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideRouter(APP_ROUTES),
    provideAuth({
      config: {
        authority: 'https://dev-2fwvrhka.us.auth0.com',
        redirectUrl: window.location.origin,
        clientId: 'E7VCSlskwSPQvM1uwPRyyGvGYOc21MSg',
        scope: 'openid profile offline_access access:api read:weather',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        postLogoutRedirectUri: window.location.origin,
        customParamsAuthRequest: {
          audience: 'https://localhost:5001',
        },
        secureRoutes: ['https://localhost:5001'],
      },
    }),
  ],
};
