import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { includeAntiforgeryTokenInterceptor } from './auth/include-antiforgery-token.interceptor';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptors([includeAntiforgeryTokenInterceptor])),
  ],
};
