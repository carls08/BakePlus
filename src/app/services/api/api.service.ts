import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { marcasI } from 'src/app/models/marcas.interface';
import { UnidadesI } from 'src/app/models/unidades.interface';
import { ingredienteI } from 'src/app/models/ingrediente.interface';
import { RegistroI } from 'src/app/models/registro.interface';
import { formularioRecetaI } from 'src/app/models/formulario-receta.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string ="http://127.0.0.1:5000/";

  constructor(private http: HttpClient) {}

    loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "usuarios/login";
    return this.http.post<ResponseI>(direccion, form);
     

    } 
    getAllMarcas():Observable<marcasI[]>{
      let direccion=this.url +"marcas/getAll";
       return this.http.get<marcasI[]>(direccion);

    }
    getAllUnidades():Observable<UnidadesI[]>{
      let direccion=this.url + "unidades_medidas/getAll";
      return this.http.get<UnidadesI[]>(direccion)
    }
    getAllIngredientes():Observable<ingredienteI[]>{
      let direccion =this.url + "ingredientes/getAll";
      return this.http.get<ingredienteI[]>(direccion)
    }
    postUsuarios(form:RegistroI):Observable<RegistroI>{
      let direccion = this.url + "/usuarios/insertar";
      return this.http.post<RegistroI>(direccion,form);
    }
    obtenerReceta() {
      let direccion = this.url + "recetas/getAll";
      return this.http.get<formularioRecetaI[]>(direccion)
        // Aquí ya puedes usar miReceta en tu componente
      };
    
    
  }

