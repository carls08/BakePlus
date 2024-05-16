import { detalleVenta } from "./detalleVenta.inteface";

export interface ventaCreate{
    id_usuario: number;
    nombre_cliente: string;
    total_venta: number;
    fecha_venta: string;
    detalleVenta: detalleVenta [];
}

export interface ventaResponse{
    id_venta: number;
    id_usuario: number;
    nombre_cliente: string;
    total_venta: number;
    fecha_venta: Date;
    estado_rg: number;
    detalleVenta: detalleVenta [];
}

export interface ventaUpdate{
    id_venta: number;
    id_usuario: number;
    nombre_cliente: string;
    total_venta: number;
    fecha_venta: Date;
    detalleVenta: detalleVenta [];
}