export interface detalleVenta{
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    precio_total: number;
}

export interface detalleVentaCreate{
    id_detalle: number;
    id_venta: number;
    id_producto: number;
    precio_unitario: number;
    precio_total: number;
    estado_rg: number;
}