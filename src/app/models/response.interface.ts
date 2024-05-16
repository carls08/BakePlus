import { permisosI } from "./permisos.interface";

export interface ResponseI{
   
    token:any;
    nombre_usuario:string;
    usuario:String;
    id_usuario: number;
    permissions: permisosI[];
}