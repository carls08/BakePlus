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
import { IngredientesComponent } from 'src/app/plantillas/ingredientes/ingredientes.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  loginByEmail(form: LoginI): Observable<ResponseI> {
    const direccion = this.url + 'usuarios/login';
    return this.http.post<any>(direccion, form).pipe(
      map((response: any) => ({
        token: response.success.data.token,
        nombre_usuario: response.success.data.nombre_usuario,
        usuario: response.success.data.usuario,
        permissions: response.success.data.permisos.map(
          (permissionArray: string[]) => ({
            name: permissionArray[0],
          })
        ),
      }))
    );
  }
  //Marcas
  getAllMarcas(): Observable<marcasI[]> {
    const headers = this.createHeaders();
    const direccion = this.url + 'marcas/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((marca: any) => ({
          id_marca: marca.id_marca.toString(),
          nombre_marca: marca.nombre_marca,
          estado_rg: marca.estado_rg
        }))
      )
    );
  }
  getAllIngredientes(): Observable<ingredientesI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + 'ingredientes/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((ingrediente: any) => ({
          id_ingrediente: ingrediente.id_ingrediente,
          nombre_ingrediente: ingrediente.nombre_ingrediente,
          id_marca:ingrediente.id_marca,
          nombre_marca: ingrediente.nombre_marca,
          fecha_compra_ingrediente:ingrediente.fecha_compra_ingrediente,
          fecha_vencimiento_ingrediente:ingrediente.fecha_vencimiento_ingrediente,
          estado_rg:ingrediente.estado_rg
        }))
      )
    );
  }
  getAllUnidades(): Observable<UnidadesI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + 'unidades_medidas/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((unidad: any) => ({
          id_unidad_medida: unidad.id_unidad_medida,
          abreviatura_unidad_medida: unidad.abreviatura_unidad_medida,
          nombre_unidad_medida:unidad.nombre_unidad_medida,
          estado_rg:unidad.estado_rg
        }))
      )
    );
  }
  getAllUsuarios(): Observable<RegistroI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + 'usuarios/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((usuario: any) => ({
          id_usuario:usuario.id_usuario,
          id_rol : usuario.id_rol,
          id_tipo_documento: usuario.id_tipo_documento,
          tipo_documento: usuario.tipo_documento,
          doc_usuario:usuario.doc_usuario,
          password_usuario: usuario.password_usuario,
          nombre_usuario: usuario.nombre_usuario,
          apellido_usuario: usuario.apellido_usuario,
          telefono_usuario: usuario.telefono_usuario,
          email_usuario: usuario.email_usuario,
          nombre_tipo_documento:usuario.nombre_tipo_documento,
          nombre_rol:usuario.nombre_rol,
          estado_rg:usuario.estado_rg
        

        
        }))
      )
    );
  }
  getAllRecetas():Observable<RecetaI[]>{
    const headers=this.createHeaders();
    let direccion = this.url + 'recetas/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((receta: any) => ({
          id_receta:receta.id_receta,
          nombre_receta:receta.nombre_receta,
          cantidad_receta:receta.cantidad_receta,
          descripcion_receta:receta.descripcion_receta,
          estado_rg:receta.estado_rg
          
        
        }))
      )
    );
  }

  insertMarca(marca: marcasI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}/marcas/insert`;
    return this.http.post<any>(direccion, marca, { headers });
  }
  insertUnidad(unidad: UnidadesI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}unidades_medidas/insert`;
    return this.http.post<any>(direccion, unidad, { headers });
  }
  insertIngrediente(ingrediente: ingredientesI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}ingredientes/insert`;
    return this.http.post<any>(direccion, ingrediente, { headers });
  }
  insertUsuarios(usuario: RegistroI): Observable<RegistroI> {
    const headers = this.createHeaders();
    const direccion = this.url + 'usuarios/insert';
    return this.http.post<RegistroI>(direccion, usuario, { headers });
  }




  updateMarcas(marca: marcasI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}marcas/update`;
    return this.http.put<any>(direccion, marca, { headers });
  }
  updateUsuarios(usuario: RegistroI):Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}usuarios/update`;
    return this.http.put<any>(direccion, usuario, { headers });
  }
  updateUnidad(unidad: UnidadesI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}unidades_medidas/update`;
    return this.http.put<any>(direccion, unidad, { headers });
  }
  updateIngrediente(ingrediente:ingredientesI): Observable<any>{
    const headers= this.createHeaders();
    const direccion =`${this.url}ingredientes/update`;
    return this.http.put<any>(direccion, ingrediente, { headers });
  }
  updateReceta(receta:RecetaI): Observable<any>{
    const headers= this.createHeaders();
    const direccion =`${this.url}recetas/update`;
    return this.http.put<any>(direccion, receta, { headers });
  }




  deleteMarca(marca: marcasI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}/marcas/delete`;
    return this.http.delete<any>(direccion, { headers, body: marca });
  }
  deleteUnidad(unidad_medida: UnidadesI): Observable<any> {
    const headers = this.createHeaders();
    const direccion = `${this.url}/unidades_medidas/delete`;
    return this.http.delete<any>(direccion, { headers, body: unidad_medida });
  }
  deleteIngrediente(ingrediente:ingredientesI):Observable<any>{
    const headers=this.createHeaders();
    const direccion=`${this.url}ingredientes/delete`;
    return this.http.delete<any>(direccion, { headers, body: ingrediente });
  }
  deleteUsuario(usuario:RegistroI):Observable<any>{
    const headers=this.createHeaders();
    const direccion=`${this.url}usuarios/delete`;
    return this.http.delete<any>(direccion, { headers, body: usuario });
  }
 
  



  getAllReceta() {
    let direccion = this.url + 'recetas/getAll';
    return this.http.get<ingredientesI>(direccion);
  }

  getAllRoles(): Observable<RolesI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + 'roles/getAll';
    return this.http.get<RolesI[]>(direccion, { headers });
  }
  getAllTipoDoc(): Observable<TipoDocI[]> {
    const headers = this.createHeaders();
    let direccion = this.url + 'tipos_documentos/getAll';
    return this.http.get<TipoDocI[]>(direccion, { headers });
  }

  // Recetas


  postRecetas(nuevaReceta: formularioRecetaI): Observable<any> {
    const headers = this.createHeaders();
    let direccion = this.url + '/recetas/insert';
    return this.http.post<formularioRecetaI>(direccion, nuevaReceta,{ headers });
  }


  updateRecetas(form: any): Observable<any> {
    const direccion = `${this.url}/recetas/update`;
    return this.http.post<any>(direccion, form);
  }

  getSingleReceta(id: any) {
    let direccion = this.url + '/recetas/getOne/' + id;
    return this.http.get(direccion);
  }

  // Create headers with authorization token
  private createHeaders() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    } else {
      // Manejar el caso cuando no hay token almacenado, como lanzar un error o devolver un objeto HttpHeaders vacío
      return new HttpHeaders();
    }
  }
}
