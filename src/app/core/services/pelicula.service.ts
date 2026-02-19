import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { Pelicula } from '../interfaces/pelicula.interface';

export interface PeliculasFiltros {
  generoId?: number;
  salaId?: number;
  titulo?: string;
  horaInicio?: string;
}

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  private readonly url = `${API_BASE_URL}/peliculas`;

  constructor(private http: HttpClient) {}

  getPeliculas(filtros?: PeliculasFiltros): Observable<Pelicula[]> {
    let params = new HttpParams();
    if (filtros?.generoId != null) params = params.set('generoId', filtros.generoId);
    if (filtros?.salaId != null) params = params.set('salaId', filtros.salaId);
    if (filtros?.titulo) params = params.set('titulo', filtros.titulo);
    if (filtros?.horaInicio) params = params.set('horaInicio', filtros.horaInicio);

    return this.http.get<Pelicula[]>(this.url, { params }).pipe(
      catchError(() => of([]))
    );
  }

  getPeliculaById(id: number): Observable<Pelicula | null> {
    return this.http.get<Pelicula>(`${API_BASE_URL}/peliculas/${id}/funciones`).pipe(
      catchError(() => of(null))
    );
  }
}
