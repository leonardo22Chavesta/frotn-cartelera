import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/cartelera/cartelera.component').then(m => m.CarteleraComponent) },
  { path: 'pelicula/:id', loadComponent: () => import('./features/detalle-pelicula/detalle-pelicula.component').then(m => m.DetallePeliculaComponent) },
  { path: 'mis-reservas', loadComponent: () => import('./features/mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent) },
  { path: '**', redirectTo: '' }
];
