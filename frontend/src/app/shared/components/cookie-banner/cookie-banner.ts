import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
})
export class CookieBanner implements OnInit {
  visible = false;

  ngOnInit() {
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => (this.visible = true), 800);
    }
  }

  accept() {
    localStorage.setItem('cookiesAccepted', 'all');
    this.visible = false;
  }

  essential() {
    localStorage.setItem('cookiesAccepted', 'essential');
    this.visible = false;
  }
}
