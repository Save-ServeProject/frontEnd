export interface Producto {
    id?: number;
    nombre: string;
    idProducto: string;
    precio: string;
    tipoProducto: 'SECO' | 'REFRIGERADO' | 'CONGELADO';
    lineaProducto?: LineaProducto[];
    alergenos?: Alergenos[];
    tipoTransporte: TipoTransporte;
}
