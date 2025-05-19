export interface Reporte {
  totalDonaciones: number;
  totalMonto: number;
  productoMasDonado: string;
  year: number;
  productosMasDonados: ProductoMasDonado[];
}

export interface ProductoMasDonado {
  nombre: string;
  cantidad: number;
}
  