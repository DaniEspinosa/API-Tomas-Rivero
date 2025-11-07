import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inmueble } from '../models/inmueble.model';

@Injectable({ providedIn: 'root' })
export class InmueblesService {
  private api = 'http://localhost:3000/inmuebles';

  constructor(private http: HttpClient) {}

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
    return this.http.get<string[]>('http://localhost:3000/inmuebles/zonas');
  }

  // Crear con FormData
  createInmueble(data: FormData): Observable<Inmueble> {
    return this.http.post<Inmueble>(this.api, data);
  }

  // Actualizar con FormData
  updateInmueble(id: number, data: FormData): Observable<Inmueble> {
    return this.http.put<Inmueble>(`${this.api}/${id}`, data);
  }

  // Eliminar
  deleteInmueble(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
