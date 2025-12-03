import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

// 👇 Importaciones correctas para Angular 16/17
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// 👇 Registramos el locale una vez
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

    // 👇 Activamos el formato español
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
};
