import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../core/services/inmuebles.service';
import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import { Inmueble } from '../../core/models/inmueble.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { Footer } from '../../shared/components/footer/footer';
import { ContactBarTs } from '../../shared/components/contact-bar.ts/contact-bar.ts';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NgIf, NgFor, ContactBarTs, Navbar, Footer, FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, RouterModule, MatButtonModule, TitleCasePipe, CurrencyPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {
  inmuebles: Inmueble[] = [];
  f: any = { tipo: '', zona: '', dormitoriosMin: '', precioMax: '' };

  constructor(private readonly service: InmueblesService) {}

  ngOnInit() { this.buscar(); }

  buscar() {
    const filtros = {
      tipo: this.f.tipo || undefined,
      zona: this.f.zona || undefined,
      dormitoriosMin: this.f.dormitoriosMin || undefined,
      precioMax: this.f.precioMax || undefined
    };
    this.service.getInmuebles(filtros).subscribe(data => this.inmuebles = data);
  }

  limpiarFiltros() {
    this.f = { tipo: '', zona: '', dormitoriosMin: '', precioMax: '' };
    this.buscar(); // recarga los inmuebles sin filtros
  }
}
