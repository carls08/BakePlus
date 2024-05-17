import { IngredienteRecetaI } from "./IngredienteReceta.interface";

export interface RecetaI {
    cantidad_receta: string;
    descripcion_receta: string;
    id_receta: number;
    nombre_receta: string;
    estado_rg: number;

}
export interface RecetaIngedienteI {
    cantidad_receta: string;
    descripcion_receta: string;
    id_receta: number;
    nombre_receta: string;
    receta_ingrediente: IngredienteRecetaI[];

}