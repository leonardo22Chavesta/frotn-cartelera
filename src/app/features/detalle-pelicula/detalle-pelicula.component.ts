import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeliculaService } from '../../core/services/pelicula.service';
import { Pelicula } from '../../core/interfaces/pelicula.interface';
import { ReservaModalComponent } from '../reserva/reserva-modal.component';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule, RouterLink, ReservaModalComponent],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.scss'
})
export class DetallePeliculaComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private peliculaService = inject(PeliculaService);

  pelicula = signal<Pelicula | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  showReservaModal = signal(false);
  funcionIdReserva = signal<number | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Película no encontrada.');
      this.loading.set(false);
      return;
    }

    this.peliculaService.getPeliculaById(+id).subscribe({
      next: (data) => {
        this.pelicula.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se pudo cargar la película.');
        this.loading.set(false);
      }
    });
  }

  openReserva(funcionId: number): void {
    this.funcionIdReserva.set(funcionId);
    this.showReservaModal.set(true);
  }

  closeReserva(): void {
    this.showReservaModal.set(false);
    this.funcionIdReserva.set(null);
  }

  onReservaOk(): void {
    this.closeReserva();
  }
}
