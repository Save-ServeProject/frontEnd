export interface BancoDeAlimentos {
    id?: number;
    nombre: string;
    direccion: string;
    telefono?: string;
    email: string;
    ciudad: string;
    contrasenia: string;
    donaciones?: Donacion[];
}
