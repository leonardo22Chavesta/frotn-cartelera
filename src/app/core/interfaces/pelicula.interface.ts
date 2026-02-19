import { Genero } from './genero.interface';
import { Funcion } from './funcion.interface';

export interface Pelicula {
  idPelicula: number;
  titulo: string;
  imagenUrl: string;
  duracion: number;
  generoId: number;
  genero?: Genero;
  funciones: Funcion[];
}
