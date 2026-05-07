import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';
import { Detalle } from './pages/detalle/detalle';
import { SobreNosotros } from './pages/sobre-nosotros/sobre-nosotros';
import { AvisoLegal } from './pages/aviso-legal/aviso-legal';
import { PoliticaPrivacidad } from './pages/politica-privacidad/politica-privacidad';
import { AdminList } from './pages/admin/admin-list/admin-list';
import { AdminForm } from './pages/admin/admin-form/admin-form';
import { adminGuard } from './core/guards/admin.guard';
import { AdminLogin } from './pages/admin/admin-login/admin-login';

export const routes: Routes = [
  { path: '', component: Catalogo },
  { path: 'inmueble/:id', component: Detalle },
  { path: 'sobre-nosotros', component: SobreNosotros },
  { path: 'aviso-legal', component: AvisoLegal },
  { path: 'politica-privacidad', component: PoliticaPrivacidad },

  { path: 'admin/login', component: AdminLogin },
  { path: 'admin', component: AdminList, canActivate: [adminGuard] },
  { path: 'admin/nuevo', component: AdminForm, canActivate: [adminGuard] },
  { path: 'admin/editar/:id', component: AdminForm, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' },
];
