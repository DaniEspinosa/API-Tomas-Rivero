import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1️⃣ Comprobar si existe token en localStorage (sesión real)
  const token = localStorage.getItem('token');

  if (token && auth.isLoggedIn()) {
    return true; // ✔️ Puede pasar
  }

  // 2️⃣ Si no hay sesión → redirigir a login
  router.navigate(['/admin/login'], {
    queryParams: { returnUrl: state.url },
  });

  return false;
};
