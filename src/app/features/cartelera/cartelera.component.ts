import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeliculaService, PeliculasFiltros } from '../../core/services/pelicula.service';
import { GeneroService } from '../../core/services/genero.service';
import { SalaService } from '../../core/services/sala.service';
import { Pelicula } from '../../core/interfaces/pelicula.interface';
import { Genero } from '../../core/interfaces/genero.interface';
import { Sala } from '../../core/interfaces/sala.interface';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.scss'
})
export class CarteleraComponent implements OnInit {
  peliculas = signal<Pelicula[]>([]);
  generos = signal<Genero[]>([]);
  salas = signal<Sala[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  generoId = signal<number | ''>('');
  salaId = signal<number | ''>('');
  titulo = signal('');
  horaInicio = signal('');

  filtros = computed<PeliculasFiltros>(() => ({
    generoId: this.generoId() || undefined,
    salaId: this.salaId() || undefined,
    titulo: this.titulo() || undefined,
    horaInicio: this.horaInicio() || undefined
  }));

  constructor(
    private peliculaService: PeliculaService,
    private generoService: GeneroService,
    private salaService: SalaService
  ) {}

  ngOnInit(): void {
    this.generoService.getGeneros().subscribe((list) => {
      this.generos.set(list);
    });
    this.salaService.getSalas().subscribe((list) => {
      this.salas.set(list);
    });
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.loading.set(true);
    this.error.set(null);
    this.peliculaService.getPeliculas(this.filtros()).subscribe({
      next: (list) => {
        this.peliculas.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la cartelera.');
        this.loading.set(false);
      }
    });
  }

  onGeneroChange(value: string): void {
    this.generoId.set(value === '' ? '' : Number(value));
  }

  onSalaChange(value: string): void {
    this.salaId.set(value === '' ? '' : Number(value));
  }

  primeraHora(p: Pelicula): string {
    const f = p.funciones?.[0];
    return f?.horaInicio ?? '—';
  }
}
