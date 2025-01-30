export interface LineaProducto {
    id?: number;
    donacion: Donacion;
    producto: Producto;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}