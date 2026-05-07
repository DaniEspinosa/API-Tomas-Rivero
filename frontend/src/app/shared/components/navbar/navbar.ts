import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = false;

  constructor(private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
    });
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  goToContact() {
    this.menuOpen = false;
    const scroll = () => {
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (this.router.url === '/') {
      scroll();
    } else {
      this.router.navigate(['/']).then(() => setTimeout(scroll, 100));
    }
  }
}
