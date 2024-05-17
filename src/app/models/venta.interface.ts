import { detalleVenta } from "./detalleVenta.inteface";

export interface ventaCreate{
    id_usuario: number;
    nombre_cliente: string;
    total_venta: number;
    fecha_venta: string;
    detalle_venta: detalleVenta [];
}

export interface ventaResponse{
    id_venta: number;
    id_usuario: number;
    nombre_cliente: string;
    total_venta: number;
    fecha_venta: Date;
    estado_rg: number;
    detalle_venta: detalleVenta [];
}

export interface ventaUpdate{
    id_venta: number;
    id_usuario: number;
    nombre_cliente: string;
    total_venta: number;
    fecha_venta: Date;
    detalle_venta: detalleVenta [];
}