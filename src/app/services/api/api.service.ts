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
import { FormBuilder } from '@angular/forms';
import { RolesI } from 'src/app/models/roles.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string ="http://127.0.0.1:5000/";

  constructor(private http: HttpClient,private fb: FormBuilder) {}

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
    getAllReceta() {
      let direccion = this.url + "recetas/getAll";
      return this.http.get<any>(direccion)
       
    }
    getAllRoles() {
      const headers = this.createHeaders();
      let direccion = this.url + "roles/getAll";
      return this.http.get<RolesI[]>(direccion,{ headers })
       
    }


    postRecetas(form:any):Observable<any>{
      let direccion = this.url + "/recetas/insert";
      return this.http.post<formularioRecetaI>(direccion,form);
    }
    
    getSingleReceta(id:any) {
      let direccion = this.url + "/recetas/getOne/" +id;
      return this.http.get(direccion);
    }

      // Create headers with authorization token
  private createHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }
    
    
  }

