import { Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';

export const COUNTRY_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'country/countries'
  },
  {
    path: 'country/countries',
    component: CountriesComponent
  },
  {
    path: 'country/create',
    component: CountryComponent
  }
];
