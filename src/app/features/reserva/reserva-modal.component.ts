import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../core/services/reserva.service';
import { ReservaStorageService } from '../../core/services/reserva-storage.service';
import { ReservaResponse, ReservaLocalStorage } from '../../core/interfaces/reserva.interface';

@Component({
  selector: 'app-reserva-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-modal.component.html',
  styleUrl: './reserva-modal.component.scss'
})
export class ReservaModalComponent {
  funcionId = input.required<number>();
  close = output<void>();
  reservaOk = output<void>();

  ticket = signal<ReservaResponse | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  private reservaService = inject(ReservaService);
  private storageService = inject(ReservaStorageService);

  form = this.fb.group({
    nombres: ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const body = {
      funcionId: this.funcionId(),
      nombres: v.nombres!,
      apellidos: v.apellidos!,
      fechaNacimiento: v.fechaNacimiento!,
      genero: v.genero!,
      tipoDocumento: v.tipoDocumento!,
      numeroDocumento: v.numeroDocumento!,
      email: v.email!
    };
    this.loading.set(true);
    this.error.set(null);
    this.reservaService.crearReserva(body).subscribe({
      next: (res) => {
        this.ticket.set(res);
        this.loading.set(false);
        const reservaLocal: ReservaLocalStorage = {
          numeroTicket: res.numeroTicket,
          funcionId: this.funcionId(),
          nombres: v.nombres!,
          apellidos: v.apellidos!,
          email: v.email!,
          fechaCreacion: new Date().toISOString(),
          mensaje: res.mensaje
        };
        this.storageService.guardarReserva(reservaLocal);
        this.reservaOk.emit();
      },
      error: () => {
        this.error.set('No se pudo completar la reserva. Intente de nuevo.');
        this.loading.set(false);
      }
    });
  }

  cerrar(): void {
    this.close.emit();
  }

  hasError(control: string, code: string): boolean {
    const c = this.form.get(control);
    return c ? c.touched && c.hasError(code) : false;
  }
}
