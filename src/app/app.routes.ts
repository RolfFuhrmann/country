import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/countries.routes').then((m) => m.COUNTRY_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
