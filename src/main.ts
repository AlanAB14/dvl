import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpRequestInterceptor } from './app/interceptors/http-request.interceptor';

registerSwiperElements();

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature), 
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpRequestInterceptor,
      multi:true
    },
    provideAnimationsAsync(),
    importProvidersFrom(
      
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem(`tkn_${environment.app}`)
          },
          // allowedDomains: ['localhost:4200'],
        },
      }),
      ),
      provideHttpClient(withInterceptorsFromDi()),
  ],
});