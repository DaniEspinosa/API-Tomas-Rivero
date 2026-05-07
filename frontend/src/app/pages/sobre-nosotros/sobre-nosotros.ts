import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { ContactBarTs } from '../../shared/components/contact-bar.ts/contact-bar.ts';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [Navbar, Footer, ContactBarTs, RouterModule, MatIconModule],
  templateUrl: './sobre-nosotros.html',
  styleUrl: './sobre-nosotros.css',
})
export class SobreNosotros {}
