import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../core/services/inmuebles.service';
import { TitleCasePipe, CurrencyPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Inmueble } from '../../core/models/inmueble.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { Footer } from '../../shared/components/footer/footer';
import { ContactBarTs } from '../../shared/components/contact-bar.ts/contact-bar.ts';
import { Navbar } from '../../shared/components/navbar/navbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReplaceUnderscorePipe } from '../../replace-underscore-pipe';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ContactBarTs,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonToggleModule,
    ReplaceUnderscorePipe,
    Navbar,
    Footer,
    CommonModule,
    DecimalPipe,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    TitleCasePipe,
    CurrencyPipe,
  ],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  inmuebles: Inmueble[] = [];
  f: any = {
    operacion: '',
    tipo: '',
    zona: '',
    estado: '',
    dormitoriosMin: '',
    dormitoriosMax: '',
    precioMin: '',
    precioMax: '',
    banosMax: '',
    banosMin: '',
    metrosMin: '',
    metrosMax: '',
  };
  showMoreFilters: boolean = false;
  moreFiltersLabel: string = 'Más filtros';

  constructor(private readonly service: InmueblesService) {}

  ngOnInit() {
    this.buscar();
  }

  toggleMoreFilters() {
    this.showMoreFilters = !this.showMoreFilters; // Alterna la visibilidad de los filtros adicionales

    // Cambiar el texto del botón según el estado de los filtros
    if (this.showMoreFilters) {
      this.moreFiltersLabel = 'Menos filtros';
    } else {
      this.moreFiltersLabel = 'Más filtros';
    }
  }

  precios: number[] = [
    50000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 225000, 250000, 275000,
    300000, 350000, 400000, 500000, 600000, 800000, 1000000,
  ];

  dormitorios: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  banos: number[] = [1, 2, 3, 4, 5];

  buscar() {
    let tiposFiltrados: string[] | undefined;

    // 🔹 Convertir grupo seleccionado en tipos reales
    if (this.f.tipo === 'pisos') {
      tiposFiltrados = ['piso', 'atico', 'duplex'];
    } else if (this.f.tipo === 'chalets') {
      tiposFiltrados = ['chalet_pareado', 'chalet_adosado', 'casa_independiente'];
    } else if (this.f.tipo) {
      tiposFiltrados = [this.f.tipo];
    }

    const filtros = {
      operacion: this.f.operacion || undefined,
      tipo: tiposFiltrados ? JSON.stringify(tiposFiltrados) : undefined,
      zona: this.f.zona || undefined,
      dormitoriosMin: this.f.dormitoriosMin || undefined,
      dormitoriosMax: this.f.dormitoriosMax || undefined,
      banosMin: this.f.banosMin || undefined,
      banosMax: this.f.banosMax || undefined,
      precioMin: this.f.precioMin || undefined,
      precioMax: this.f.precioMax || undefined,
      metrosMin: this.f.metrosMin || undefined,
      metrosMax: this.f.metrosMax || undefined,
      estado: this.f.estado || undefined,
    };

    console.log('🔍 Enviando filtros:', filtros);

    this.service.getInmuebles(filtros).subscribe({
      next: (data) => (this.inmuebles = data),
      error: (err) => console.error('❌ Error cargando inmuebles:', err),
    });
  }

  limpiarFiltros() {
    this.f = {
      operacion: '',
      tipo: '',
      zona: '',
      estado: '',
      dormitoriosMin: '',
      dormitoriosMax: '',
      banosMin: '',
      banosMax: '',
      precioMin: '',
      precioMax: '',
      metrosMin: '',
      metrosMax: '',
    };
    this.buscar(); // Vuelve a cargar sin filtros
  }
}
