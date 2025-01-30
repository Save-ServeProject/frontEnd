export interface Donacion {
    idDonacion?: number;
    totalDonacion: number;
    fechaEntrega: Date;
    estadoEnvio: 'ENTREGADO' | 'ENVIADO' | 'PENDIENTE';
    donacionesRelacionadas?: Donacion[];
    donacionPrincipal?: Donacion;
    empresa: Empresa;
    lineasProducto?: LineaProducto[];
    bancoDeAlimentos: BancoDeAlimentos;
    transporte: Transporte;
}