import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch()
    ),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    importProvidersFrom(
      TranslateModule.forRoot()
    ),
    ...provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
    provideClientHydration(withEventReplay()),
  ],
};
