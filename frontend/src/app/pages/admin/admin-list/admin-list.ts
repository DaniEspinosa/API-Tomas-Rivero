import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../../core/services/inmuebles.service';
import { Inmueble } from '../../../core/models/inmueble.model';
import { Router } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';
import { ReplaceUnderscorePipe } from '../../../replace-underscore-pipe';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    CommonModule,
    ReplaceUnderscorePipe,
    CurrencyPipe,
    TitleCasePipe,
    MatIconModule,
    Navbar,
    Footer,
  ],
  templateUrl: './admin-list.html',
  styleUrls: ['./admin-list.css'],
})
export class AdminList implements OnInit {
  inmuebles: Inmueble[] = [];
  loading = false;

  get inmueblesActivos() {
    return this.inmuebles.filter(
      (i) => !i.estadoVenta || i.estadoVenta === 'disponible' || i.estadoVenta === 'reservado'
    );
  }

  get inmueblesCerrados() {
    return this.inmuebles.filter(
      (i) => i.estadoVenta === 'vendido' || i.estadoVenta === 'alquilado'
    );
  }
  readonly BASE = environment.apiUrl;

  inmuebleToDelete: Inmueble | null = null;
  toast: { message: string; type: 'success' | 'error' } | null = null;
  private toastTimer: any;

  constructor(
    private readonly api: InmueblesService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.cargar();
    const toastMsg = (history.state as { toast?: string })?.toast;
    if (toastMsg) this.mostrarToast(toastMsg, 'success');
  }

  cargar() {
    this.loading = true;
    this.api.getInmuebles().subscribe({
      next: (data) => { this.inmuebles = data; this.loading = false; },
      error: () => (this.loading = false),
    });
  }

  nuevo() { this.router.navigate(['/admin/nuevo']); }

  editar(i: Inmueble) { this.router.navigate(['/admin/editar', i.id]); }

  eliminar(i: Inmueble) {
    if (!i.id) return;
    this.inmuebleToDelete = i;
  }

  cancelarEliminar() { this.inmuebleToDelete = null; }

  confirmarEliminar() {
    if (!this.inmuebleToDelete?.id) return;
    const id = this.inmuebleToDelete.id;
    this.inmuebleToDelete = null;
    this.api.deleteInmueble(id).subscribe({
      next: () => { this.mostrarToast('Inmueble eliminado correctamente', 'success'); this.cargar(); },
      error: () => this.mostrarToast('Error al eliminar el inmueble', 'error'),
    });
  }

  mostrarToast(message: string, type: 'success' | 'error') {
    clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.toastTimer = setTimeout(() => (this.toast = null), 3500);
  }
}
