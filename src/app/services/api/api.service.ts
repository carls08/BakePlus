import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { marcasI } from 'src/app/models/marcas.interface';
import { UnidadesI } from 'src/app/models/unidades.interface';
import { ingredientesI } from 'src/app/models/ingrediente.interface';
import { RegistroI } from 'src/app/models/registro.interface';
import { formularioRecetaI } from 'src/app/models/formulario-receta.interface';
import { FormBuilder } from '@angular/forms';
import { RolesI } from 'src/app/models/roles.interfaces';
import { TipoDocI } from 'src/app/models/tipoDocument.interface';
import { RecetaI } from 'src/app/models/receta.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://127.0.0.1:5000/";

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  loginByEmail(form: LoginI): Observable<ResponseI> {
    const direccion = this.url + "usuarios/login";
    return this.http.post<any>(direccion, form).pipe(
      map((response: any) => ({
        token: response.success.data.token,
        nombre_usuario: response.success.data.nombre_usuario,
        usuario: response.success.data.usuario,
        permissions: response.success.data.permisos.map((permissionArray: string[]) => ({
          name: permissionArray[0]
        }))
      }))
    );
  }
  //Marcas
  getAllMarcas(): Observable<marcasI[]> {
    const headers = this.createHeaders();
    const direccion = this.url + "marcas/getAll";
    return this.http.get<any>(direccion, { headers }).pipe(
      map(response => response.success.data.map((marca: any) => ({
        id_marca: marca.id_marca.toString(),
        nombre_marca: marca.nombre_marca
      })))
    );
  }
  insertMarca(marca: marcasI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}/marcas/insert`;
    return this.http.post<any>(direccion, marca, { headers });
}
  updateMarcas(marca: marcasI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}marcas/update`;
    return this.http.put<any>(direccion, marca, { headers });
}

  deleteMarca(marca: marcasI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}/marcas/delete`;
    return this.http.delete<any>(direccion, { headers, body: marca });
}

  getAllUnidades(): Observable<UnidadesI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + "unidades_medidas/getAll";
    return this.http.get<UnidadesI[]>(direccion, { headers })
  }
  getAllIngredientes(): Observable<ingredientesI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + "ingredientes/getAll";
    return this.http.get<ingredientesI[]>(direccion, { headers })
  }
  postUsuarios(form: RegistroI): Observable<RegistroI> {
    const headers = this.createHeaders();
    const direccion = this.url + "/usuarios/insert";
    return this.http.post<RegistroI>(direccion, form, { headers });
}
  getAllReceta() {
    let direccion = this.url + "recetas/getAll";
    return this.http.get<ingredientesI>(direccion)

  }

  getAllRoles(): Observable<RolesI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + "roles/getAll";
    return this.http.get<RolesI[]>(direccion, { headers })

  }
  getAllTipoDoc(): Observable<TipoDocI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + "tipos_documentos/getAll";
    return this.http.get<TipoDocI[]>(direccion, { headers })
  }

  // Recetas 
  getAllRecetas(): Observable<RecetaI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + "recetas/getAll";
    return this.http.get<RecetaI[]>(direccion, { headers })
  }


  postRecetas(form: any): Observable<any> {
    let direccion = this.url + "/recetas/insert";
    return this.http.post<formularioRecetaI>(direccion, form);
  }

  updateRecetas(form: any): Observable<any> {
    const direccion = `${this.url}/recetas/update`;
    return this.http.post<any>(direccion, form);
  }



  getSingleReceta(id: any) {
    let direccion = this.url + "/recetas/getOne/" + id;
    return this.http.get(direccion);
  }

  // Create headers with authorization token
  private createHeaders() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      // Manejar el caso cuando no hay token almacenado, como lanzar un error o devolver un objeto HttpHeaders vacío
      return new HttpHeaders();
    }
  }


}

