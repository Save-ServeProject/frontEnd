export interface TipoTransporte {
    id?: number;
    tipo: string;
    productos?: Producto[];
    transportes?: Transporte[];
}