import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { Genero } from '../interfaces/genero.interface';

@Injectable({ providedIn: 'root' })
export class GeneroService {
  private readonly url = `${API_BASE_URL}/generos`;

  constructor(private http: HttpClient) {}

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.url).pipe(
      catchError(() => of([]))
    );
  }
}
