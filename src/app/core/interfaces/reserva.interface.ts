export interface ReservaRequest {
  funcionId: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: string;
  tipoDocumento: string;
  numeroDocumento: string;
  email: string;
}

export interface ReservaResponse {
  numeroTicket: string;
  mensaje?: string;
}

export interface ReservaLocalStorage {
  numeroTicket: string;
  funcionId: number;
  nombres: string;
  apellidos: string;
  email: string;
  fechaCreacion: string;
  mensaje?: string;
}
