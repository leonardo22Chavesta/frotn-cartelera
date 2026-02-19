import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservaStorageService } from '../../core/services/reserva-storage.service';
import { ReservaLocalStorage } from '../../core/interfaces/reserva.interface';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.scss'
})
export class MisReservasComponent implements OnInit {
  reservas = signal<ReservaLocalStorage[]>([]);
  loading = signal(false);

  constructor(private storageService: ReservaStorageService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.loading.set(true);
    setTimeout(() => {
      const lista = this.storageService.obtenerReservas();
      this.reservas.set(lista.sort((a, b) => 
        new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      ));
      this.loading.set(false);
    }, 300);
  }

  eliminarReserva(numeroTicket: string): void {
    if (confirm('¿Está seguro de eliminar esta reserva?')) {
      this.storageService.eliminarReserva(numeroTicket);
      this.cargarReservas();
    }
  }

  formatearFecha(fecha: string): string {
    const d = new Date(fecha);
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
