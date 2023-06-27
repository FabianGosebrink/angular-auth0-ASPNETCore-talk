import { enableProdMode, importProvidersFrom } from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AuthInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { APP_ROUTES } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
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
}).catch((err) => console.error(err));
