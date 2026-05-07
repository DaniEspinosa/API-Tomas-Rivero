import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-bar.ts.html',
  styleUrl: './contact-bar.ts.css'
})
export class ContactBarTs implements OnInit, OnDestroy {
  visible = false;
  private timer: any;

  ngOnInit() {
    this.timer = setTimeout(() => { this.visible = true; }, 3000);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.visible) this.visible = true;
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
