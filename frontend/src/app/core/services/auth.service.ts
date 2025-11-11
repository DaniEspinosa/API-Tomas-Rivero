import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://api-tomas-rivero.onrender.com'; // URL correcta de tu backend desplegado

  private key = 'token';

  constructor(private http: HttpClient) {}

  // 👇 helper para saber si estamos en navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.api}/auth/login`, { email, password })
      .pipe(tap(({ token }) => this.setToken(token)));
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.key);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.key) : null;
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.key, token);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
