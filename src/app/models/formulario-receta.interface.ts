export interface formularioRecetaI{
    nombre: string;
    cantidad: number;
    descripcion: string;
    ingredientes_receta: {
        ingrediente_id: number,
        cantidad:number,
        unidad_medida:number
    }

  
}