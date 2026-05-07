import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ContactForm {
  nombre: string;
  telefono: string;
  email?: string;
  mensaje: string;
  inmuebleTitulo?: string;
  inmuebleId?: number;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private api = `${environment.apiUrl}/contact`;

  constructor(private readonly http: HttpClient) {}

  send(form: ContactForm) {
    return this.http.post<{ ok: boolean }>(this.api, form);
  }
}
