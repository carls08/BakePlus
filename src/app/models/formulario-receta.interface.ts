import { IngredienteRecetaI } from "./IngredienteReceta.interface";

//interface para mandar a la api para registar una receta
export interface formularioRecetaI{
        
        nombre_receta: string;
        cantidad_receta: number;
        descripcion_receta: string;
        receta_ingrediente: IngredienteRecetaI[];
}
  