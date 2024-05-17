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
import { RecetaI, RecetaIngedienteI } from 'src/app/models/receta.interface';
import { map } from 'rxjs/operators';
import { IngredientesComponent } from 'src/app/plantillas/ingredientes/ingredientes.component';
import { productosI } from 'src/app/models/productos.interface';
import { EditarItemModalComponent } from 'src/app/plantillas/editar-item-modal/editar-item-modal.component';
import { produccionI } from 'src/app/models/produccion.interface';
import { ventaCreate, ventaResponse } from 'src/app/models/venta.interface';

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
        id_usuario: response.success.data.id_usuario,
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
  getRecetaIngedientes(id_receta: number): Observable<RecetaIngedienteI> {
    const headers = this.createHeaders();
    const direccion = this.url + 'recetas/getOne/' + id_receta;
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) => {
        const data = response.success.data;
        return {
          id_receta: id_receta,
          nombre_receta: data.nombre_receta,
          cantidad_receta: data.cantidad_receta,
          descripcion_receta: data.descripcion_receta,
          receta_ingrediente: data.receta_ingrediente.map((ingrediente: any) => ({
            cantidad_ingrediente: ingrediente.cantidad_ingrediente,
            ingrediente: ingrediente.ingrediente,
            unidad_medida: ingrediente.unidad_medida
          }))
        };
      })
    );
  }
  getAllProductos():Observable<productosI[]>{
    const headers=this.createHeaders();
    let direccion = this.url + 'productos/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((producto: any) => ({
          nombre_receta:producto.nombre_receta,
          id_producto:producto.id_producto,
          id_receta:producto.id_receta,
          nombre_producto:producto.nombre_producto,
          precio_producto:producto.precio_producto,
          cantidad_producto:producto.cantidad_producto,
          estado_rg:producto.estado_rg
          
        
        }))
      )
    );
  }
  getAllProduccion():Observable<produccionI[]>{
    const headers=this.createHeaders();
    let direccion = this.url + 'producciones/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((produccion: any) => ({
          id_produccion:produccion.id_produccion,
          id_producto:produccion.id_producto,
          id_usuario:produccion.id_usuario,
          nombre_usuario:produccion.nombre_usuario,
          nombre_producto:produccion.nombre_producto,
          cantidad_produccion:produccion.cantidad_produccion,
          fecha_produccion:produccion.fecha_produccion,
          last_cantidad:produccion.last_cantidad,
          estado_rg:produccion.estado_rg
         
          
        
        }))
      )
    );
  }
  getAllRoles(): Observable<RolesI[]> {
    const headers = this.createHeaders();
    const direccion = this.url + 'roles/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((rol: any) => ({
          id_rol: rol.id_rol,
          nombre_rol: rol.nombre_rol
        }))
      )
    );
  }

  getAllVentas(): Observable<ventaResponse[]> {
    const headers = this.createHeaders();
    const direccion = this.url + 'ventas/getAll';
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((ventas: ventaResponse) => ({
          id_venta:ventas.id_venta,
          nombre_usuario:ventas.nombre_usuario,
          nombre_cliente:ventas.nombre_cliente,
          total_venta:ventas.total_venta,
          fecha_venta:ventas.fecha_venta,
          estado_rg:ventas.estado_rg,
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
    return this.http.post<any>(direccion, usuario, { headers });
  }
 insertProductos(producto:productosI):Observable<productosI>{
  const headers = this.createHeaders();
    const direccion = this.url + 'productos/insert';
  return this.http.post<any>(direccion, producto, { headers });
 }
 insertProduccion(produccion:produccionI):Observable<produccionI>{
  const headers = this.createHeaders();
    const direccion = this.url + 'producciones/insert';
  return this.http.post<any>(direccion, produccion, { headers });
 }
 insertVenta(venta:ventaCreate):Observable<ventaCreate>{
  const headers = this.createHeaders();
    const direccion = this.url + 'ventas/insert';
  return this.http.post<any>(direccion, venta, { headers });
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
  updateProducto(producto:productosI): Observable<any>{
    const headers= this.createHeaders();
    const direccion =`${this.url}productos/update`;
    return this.http.put<any>(direccion, producto, { headers });
  }
  updateProduccion(produccion:produccionI): Observable<any>{
    const headers= this.createHeaders();
    const direccion =`${this.url}producciones/update`;
    return this.http.put<any>(direccion, produccion, { headers });
  }
  updateRecetas(form: any): Observable<any> {
    const direccion = `${this.url}/recetas/update`;
    return this.http.post<any>(direccion, form);
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
  deleteProducto(producto:productosI):Observable<any>{
    const headers=this.createHeaders();
    const direccion=`${this.url}productos/delete`;
    return this.http.delete<any>(direccion, { headers, body: producto });
  }
  deleteProduccion(produccion:produccionI):Observable<any>{
    const headers=this.createHeaders();
    const direccion=`${this.url}producciones/delete`;
    return this.http.delete<any>(direccion, { headers, body: produccion });
  }
  deleteReceta(receta:RecetaI):Observable<any>{
    const headers=this.createHeaders();
    const direccion=`${this.url}recetas/delete`;
    return this.http.delete<any>(direccion, { headers, body: receta });
  }
  deleteVentas(ventas:ventaResponse):Observable<any>{
    const headers=this.createHeaders();
    const direccion=`${this.url}ventas/delete`;
    return this.http.delete<any>(direccion, { headers, body: ventas });
  }
 
  



  getAllReceta() {
    let direccion = this.url + 'recetas/getAll';
    return this.http.get<ingredientesI>(direccion);
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
