import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    

    ],
};
