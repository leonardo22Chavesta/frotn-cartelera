import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { Sala } from '../interfaces/sala.interface';

@Injectable({ providedIn: 'root' })
export class SalaService {
  private readonly url = `${API_BASE_URL}/salas`;

  constructor(private http: HttpClient) {}

  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.url).pipe(
      catchError(() => of([]))
    );
  }
}
