import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../core/services/inmuebles.service';
import { ContactService } from '../../core/services/contact.service';
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
import { Footer } from '../../shared/components/footer/footer';
import { ContactBarTs } from '../../shared/components/contact-bar.ts/contact-bar.ts';
import { Navbar } from '../../shared/components/navbar/navbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReplaceUnderscorePipe } from '../../replace-underscore-pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    ContactBarTs,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
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
  readonly BASE = environment.apiUrl;
  inmuebles: Inmueble[] = [];
  exitos: Inmueble[] = [];
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
  showMobileFilters: boolean = false;
  closingSheet: boolean = false;
  zonas: string[] = [];
  filteredZonas: string[] = [];

  contact = { nombre: '', telefono: '', email: '', mensaje: '' };
  contactSending = false;
  contactSent = false;
  contactError = false;

  constructor(
    private readonly service: InmueblesService,
    private readonly contactService: ContactService,
  ) {}

  ngOnInit() {
    this.buscar();
    this.cargarZonas();
    this.cargarExitos();
  }

  get moreFiltersLabel(): string {
    return this.showMoreFilters ? 'Menos filtros' : 'Más filtros';
  }

  get activeFilterCount(): number {
    const extras = ['estado', 'dormitoriosMin', 'dormitoriosMax', 'banosMin', 'banosMax', 'precioMin', 'precioMax', 'metrosMin', 'metrosMax'];
    return extras.filter(k => this.f[k] !== '' && this.f[k] !== undefined).length;
  }

  get tieneFilters(): boolean {
    return Object.values(this.f).some((v: any) => v !== '' && v !== undefined);
  }

  setOperacion(op: string) {
    this.f.operacion = op;
    this.buscar();
  }

  toggleMoreFilters() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  precios: number[] = [
    50000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 225000, 250000, 275000,
    300000, 350000, 400000, 500000, 600000, 800000, 1000000,
  ];

  dormitorios: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  banos: number[] = [1, 2, 3, 4, 5];

  buscar() {
    let tiposFiltrados: string[] | undefined;

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

    this.service.getInmuebles(filtros).subscribe({
      next: (data) => (this.inmuebles = data.filter(
        (i) => !i.estadoVenta || i.estadoVenta === 'disponible' || i.estadoVenta === 'reservado'
      )),
      error: (err) => console.error('Error cargando inmuebles:', err),
    });
  }

  cargarExitos() {
    this.service.getInmuebles({}).subscribe({
      next: (data) => (this.exitos = data.filter(
        (i) => i.estadoVenta === 'vendido' || i.estadoVenta === 'alquilado'
      )),
      error: (err) => console.error('Error cargando éxitos:', err),
    });
  }

  clearZona() {
    this.f.zona = '';
    this.filteredZonas = this.zonas;
    this.buscar();
  }

  cargarZonas() {
    this.service.getZonas().subscribe({
      next: (zs) => {
        this.zonas = zs ?? [];
        this.filteredZonas = [...this.zonas];
      },
      error: (e) => console.error('Error cargando zonas', e),
    });
  }

  normalize(t: string) {
    return (t || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
  }

  filterZonas(value: string) {
    const v = this.normalize(value);
    this.filteredZonas = v
      ? this.zonas.filter((z) => this.normalize(z).includes(v))
      : [...this.zonas];
  }

  onZonaFocus() {
    this.filterZonas(this.f.zona || '');
  }

  onZonaSelected(zona: string) {
    this.f.zona = zona;
  }

  closeSheet() {
    this.closingSheet = true;
    setTimeout(() => { this.showMobileFilters = false; this.closingSheet = false; }, 280);
  }

  sendContact() {
    if (!this.contact.nombre || !this.contact.telefono || !this.contact.mensaje) return;
    this.contactSending = true;
    this.contactError = false;
    this.contactService.send(this.contact).subscribe({
      next: () => { this.contactSending = false; this.contactSent = true; },
      error: () => { this.contactSending = false; this.contactError = true; },
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
    this.showMoreFilters = false;
    this.buscar();
  }
}
