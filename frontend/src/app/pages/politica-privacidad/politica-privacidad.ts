import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './politica-privacidad.html',
  styleUrl: './politica-privacidad.css',
})
export class PoliticaPrivacidad {}
