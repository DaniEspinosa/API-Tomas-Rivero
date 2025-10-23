import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';
import { Detalle } from './pages/detalle/detalle';
import { AdminList } from './pages/admin/admin-list/admin-list';
import { AdminForm } from './pages/admin/admin-form/admin-form';
import { adminGuard } from './core/guards/admin.guard';
import { AdminLogin } from './pages/admin/admin-login/admin-login';


export const routes: Routes = [
  { path: '', component: Catalogo },
  { path: 'inmueble/:id', component: Detalle },

  { path: 'admin/login', component: AdminLogin },
  { path: 'admin', component: AdminList },
  { path: 'admin/nuevo', component: AdminForm },
  { path: 'admin/editar/:id', component: AdminForm },

  { path: '**', redirectTo: '' }
];
