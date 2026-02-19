import { Injectable } from '@angular/core';
import { ReservaLocalStorage } from '../interfaces/reserva.interface';

const STORAGE_KEY = 'cine_reservas';

@Injectable({ providedIn: 'root' })
export class ReservaStorageService {
  guardarReserva(reserva: ReservaLocalStorage): void {
    const reservas = this.obtenerReservas();
    reservas.push(reserva);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
  }

  obtenerReservas(): ReservaLocalStorage[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  eliminarReserva(numeroTicket: string): void {
    const reservas = this.obtenerReservas();
    const filtradas = reservas.filter(r => r.numeroTicket !== numeroTicket);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
  }

  limpiarReservas(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
