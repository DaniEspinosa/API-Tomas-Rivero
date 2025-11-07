import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),

    // ✅ Habilita HTTP con fetch (recomendado por Angular)
    provideHttpClient(withFetch()),

    // ✅ Router con scroll al inicio y transiciones suaves
    provideRouter(
      routes,
      withViewTransitions(), // animaciones entre páginas
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // siempre sube al inicio
        anchorScrolling: 'enabled', // permite desplazamiento a anclas
      })
    ),
  ],
}).catch((err) => console.error(err));
