export interface formularioRecetaI{
        nombre_receta: string;
        cantidad_receta: number;
        descripcion_receta: string;
    receta_ingrediente: {
        ingrediente_id: number,
        cantidad_ingrediente:number,
        id_unidad_medida:number
    }

  
}