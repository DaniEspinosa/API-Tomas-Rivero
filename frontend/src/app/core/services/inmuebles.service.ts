import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inmueble } from '../models/inmueble.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class InmueblesService {
  private api = 'https://tomasapi.es/inmuebles';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // 🔒 Helper: headers con token
  private getAuthHeaders() {
    const token = this.auth.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  // Listado con filtros opcionales
  getInmuebles(filtros?: any): Observable<Inmueble[]> {
    let params = new HttpParams();
    if (filtros) {
      Object.keys(filtros).forEach((k) => {
        if (filtros[k] !== null && filtros[k] !== undefined && filtros[k] !== '') {
          params = params.set(k, filtros[k]);
        }
      });
    }
    return this.http.get<Inmueble[]>(this.api, { params });
  }

  // Obtener uno
  getInmueble(id: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.api}/${id}`);
  }

  getZonas() {
    return this.http.get<string[]>('https://tomasapi.es/inmuebles/zonas');
  }

  // Crear con FormData (🔒 requiere token)
  createInmueble(data: FormData): Observable<Inmueble> {
    return this.http.post<Inmueble>(this.api, data, this.getAuthHeaders());
  }

  // Actualizar con FormData (🔒 requiere token)
  updateInmueble(id: number, data: FormData): Observable<Inmueble> {
    return this.http.put<Inmueble>(`${this.api}/${id}`, data, this.getAuthHeaders());
  }

  // Eliminar (🔒 requiere token)
  deleteInmueble(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, this.getAuthHeaders());
  }
}
