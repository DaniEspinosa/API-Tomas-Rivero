import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './aviso-legal.html',
  styleUrl: './aviso-legal.css',
})
export class AvisoLegal {}
