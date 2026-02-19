import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { ReservaRequest, ReservaResponse } from '../interfaces/reserva.interface';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly url = `${API_BASE_URL}/Reservas`;

  constructor(private http: HttpClient) {}

  crearReserva(body: ReservaRequest): Observable<ReservaResponse> {
    return this.http.post<ReservaResponse>(this.url, body).pipe(
      catchError((err) => throwError(() => err))
    );
  }
}
