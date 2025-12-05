import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InmueblesService } from '../../../core/services/inmuebles.service';
import { Inmueble } from '../../../core/models/inmueble.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Footer } from '../../../shared/components/footer/footer';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    Navbar,
    Footer,
  ],
  templateUrl: './admin-form.html',
  styleUrls: ['./admin-form.css'],
})
export class AdminForm implements OnInit {
  id?: number;

  model: Inmueble = {
    titulo: '',
    descripcion: '',
    operacion: 'venta',
    tipo: 'piso',
    zona: '',
    dormitorios: 1,
    banos: 1,
    metrosUtiles: 0,
    metrosConstruidos: 0,
    metrosParcela: 0,
    precio: 0,
    estado: 'en buen estado',
    orientacion: undefined,
    anoConstruccion: undefined,
    calefaccion: 'no disponible',
    gastosComunidad: undefined,
    caracteristicas: [],
    ascensor: false,
    fotoPrincipal: '',
    urlIdealista: '',
  };

  selectedFile: File | null = null;
  loading = false;

  constructor(
    private api: InmueblesService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.api.getInmueble(this.id).subscribe((i) => {
        // Si viene como string JSON en caracteristicas -> parseamos
        if (typeof i.caracteristicas === 'string') {
          try {
            i.caracteristicas = JSON.parse(i.caracteristicas);
          } catch {
            i.caracteristicas = [];
          }
        }
        this.model = i;
      });
    }
  }

  // 📸 Capturamos el archivo del input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  guardar() {
    this.loading = true;

    const formData = new FormData();
    formData.append('titulo', this.model.titulo || '');
    formData.append('descripcion', this.model.descripcion || '');
    formData.append('operacion', this.model.operacion || 'venta');
    formData.append('tipo', this.model.tipo || 'piso');
    formData.append('zona', this.model.zona || '');
    formData.append('dormitorios', this.model.dormitorios?.toString() ?? '0');
    formData.append('banos', this.model.banos?.toString() ?? '0');
    formData.append('metrosUtiles', this.model.metrosUtiles?.toString() ?? '0');
    formData.append('metrosConstruidos', this.model.metrosConstruidos?.toString() ?? '0');
    formData.append('metrosParcela', this.model.metrosParcela?.toString() ?? '0');
    formData.append('precio', this.model.precio?.toString() ?? '0');
    formData.append('estado', this.model.estado || 'en buen estado');

    if (this.model.orientacion) {
      formData.append('orientacion', this.model.orientacion);
    }

    if (this.model.anoConstruccion != null) {
      formData.append('anoConstruccion', this.model.anoConstruccion.toString());
    }

    formData.append('calefaccion', this.model.calefaccion || 'no disponible');

    if (this.model.gastosComunidad != null) {
      formData.append('gastosComunidad', this.model.gastosComunidad.toString());
    }

    formData.append('ascensor', this.model.ascensor ? 'true' : 'false');

    if (this.model.caracteristicas && this.model.caracteristicas.length > 0) {
      formData.append('caracteristicas', JSON.stringify(this.model.caracteristicas));
    }

    formData.append('urlIdealista', this.model.urlIdealista || '');

    if (this.selectedFile) {
      formData.append('fotoPrincipal', this.selectedFile);
    }

    const obs = this.id
      ? this.api.updateInmueble(this.id, formData)
      : this.api.createInmueble(formData);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.snack.open(
          this.id ? '✅ Inmueble actualizado con éxito' : '✅ Inmueble creado con éxito',
          'Cerrar',
          { duration: 3000, panelClass: 'snackbar-success' }
        );
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.loading = false;
        this.snack.open('❌ Error guardando inmueble', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-error',
        });
      },
    });
  }

  cancelar() {
    this.router.navigate(['/admin']);
  }
}
