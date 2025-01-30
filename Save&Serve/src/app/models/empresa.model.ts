export interface Empresa {
    id?: number;
    nombre: string;
    email: string;
    direccion?: string;
    telefono?: string;
    cif: string;
    contrasenia: string;
    tipo?: string;
    ciudad?: string;
    suscripcion?: 'ADMIN' | 'USER' | 'GUEST';
    donaciones?: Donacion[];
    //Puede que toque cambiar cosas cuando la base de datos este
}




