import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
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
  exports: [AuthModule],
})
export class AuthConfigModule {}
