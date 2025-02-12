import { Donacion } from './donacion.model';

export interface BancoDeAlimentos {
    id?: number;
    nombre: string;
    direccion: string;
    telefono?: string;
    email: string;
    ciudad: string;
    contrasenia: string;
    donaciones?: Donacion[];
    // imagen: string; comentada a la espera de que se introduzca en base de datos
}