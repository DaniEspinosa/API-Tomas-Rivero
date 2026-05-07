import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieBanner } from './shared/components/cookie-banner/cookie-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieBanner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      // ✅ Solo ejecuta en el navegador (no en SSR)
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
