import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './politica-privacidad.html',
  styleUrl: './politica-privacidad.css',
})
export class PoliticaPrivacidad {}
