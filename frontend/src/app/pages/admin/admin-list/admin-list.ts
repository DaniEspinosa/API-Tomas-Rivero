import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../../core/services/inmuebles.service';
import { Inmueble } from '../../../core/models/inmueble.model';
import { Router } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatCardModule, CurrencyPipe, TitleCasePipe, MatSnackBarModule, Navbar, Footer],
  templateUrl: './admin-list.html',
  styleUrls: ['./admin-list.css']
})
export class AdminList implements OnInit {
  inmuebles: Inmueble[] = [];
  loading = false;

  constructor(private api: InmueblesService, private router: Router, private snack: MatSnackBar) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.api.getInmuebles().subscribe({
      next: data => { 
        this.inmuebles = data; 
        this.loading = false; 
      },
      error: () => this.loading = false
    });
  }

  nuevo() {
    this.router.navigate(['/admin/nuevo']);
  }

  editar(i: Inmueble) {
    this.router.navigate(['/admin/editar', i.id]);
  }

  eliminar(i: Inmueble) {
    if (!i.id) return;
    if (!confirm(`¿Eliminar "${i.titulo}"?`)) return;

    this.api.deleteInmueble(i.id).subscribe({
      next: () => {
        this.snack.open('✅ Inmueble eliminado con éxito', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
        this.cargar();
      },
      error: () => {
        this.snack.open('❌ Error eliminando inmueble', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-error'
        });
      }
    });
  }
}
