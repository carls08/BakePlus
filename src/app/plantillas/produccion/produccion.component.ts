import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';
import Swal from 'sweetalert2';
import { produccionI } from 'src/app/models/produccion.interface';
import { productosI } from 'src/app/models/productos.interface';
import { AuthService } from 'src/app/services/auth.service';
import { permisosI } from 'src/app/models/permisos.interface';
import { RegistroI } from 'src/app/models/registro.interface';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent {
  activeTab: string = 'registro'; // Puedes establecer 'registro' como pestaña activa por defecto

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
  nuevoFormProduccion:FormGroup;
  produccion:any=[];
  producto: productosI[] = [];
  usuarios: RegistroI[]=[];
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  isAuthenticated: boolean = false;
  loggedInUsername: string | null = null;
  permisos: permisosI[] | null = [];
  status_form:number = 0;
  status_response: boolean = false;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,private modalServiceNgb: NgbModal,private authService: AuthService) {
    this.nuevoFormProduccion = this.fb.group({
    id_usuario:['',Validators.required],
      id_producto:['',Validators.required],
      cantidad_produccion:['',Validators.required],
      fecha_produccion:['',Validators.required],
      id_produccion:['']
      
     
    });

  }

  tipoAccion(accion: number, data: any = []) {
    this.status_form = accion;
    if (accion == 1) {
      this.nuevoFormProduccion.patchValue(data);
      
    } else {
      this.nuevoFormProduccion.patchValue({
        'cantidad_produccion': '',
        'fecha_produccion':'',
        'id_usuario':'',
        'id_producto':'',
      
      });
    }
  }

  ngOnInit():void{
    this.getProduccion();
    this.getProducto();
    this.getUsuario();
    
      }

  getProduccion() {
    this.api.getAllProduccion().subscribe(data => {
      console.log(data)
      this.produccion = data;
    })
  }
  getProducto(){
    this.api.getAllProductos().subscribe({
      next:(data:productosI[])=>{
        this.producto = data;
        if(Array.isArray(data)){
          this.producto = data;
        }else{
          this.producto = data;
        }
      },
      error:(error) =>{
        console.error("Error al obtener los productos", error)
      }
    }); 
  }
  getUsuario(){
    this.api.getAllUsuarios().subscribe({
      next:(data:RegistroI[])=>{
        this.usuarios = data;
        if(Array.isArray(data)){
          this.usuarios = data;
        }else{
          this.usuarios = data;
        }
      },
      error:(error) =>{
        console.error("Error al obtener los usuarios", error)
      }
    }); 
  }
  
  insertProduccion(produccion: produccionI) {
    switch(this.status_form){
      case 0:
        this.api.insertProduccion(produccion).subscribe(() => {
          console.log('produccion insertada correctamente');
          Swal.fire({
            icon: "success",
            title: "Has ingresado",
            showConfirmButton: false,
            timer: 1000
          });
          this.status_response = true;
        }, (error) => {
          console.error('Error al insertar la produccion:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "produccions o contraseña incorrecto",
            footer: '<a href="">Intenta nuevamente</a>'
          });
          this.status_response = false;
        });
        break;
        case 1: 
        this.api.updateProduccion(produccion).subscribe(()=>{
          console.log('produccions actualizado correctamente');
          Swal.fire({
            icon: "success",
            title: "produccions actualizado correctamente",
            showConfirmButton: false,
            timer: 1000
          });
          this.status_response = true;
        }, (error) => {
          console.error('Error al actualizar produccions:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al actualizar produccions",
            footer: '<a href="">Intenta nuevamente</a>'
          });
          this.status_response = false;
        });
        break;
      default:
        console.log("Opción no reconocida");
  }
  setTimeout(() => {
    this.getProduccion();
  }, 2000);
  }


  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  getCurrentPageItems(): produccionI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.produccion.slice(startIndex, endIndex);
  }
 
  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.produccion.length / this.pageSize);
  }

  isFormValid(): boolean {
    return this.nuevoFormProduccion.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
  desactivarProduccion(produccion: produccionI) {
    // Crear un nuevo objeto Uproducto con el cambio en estado_rg
    const produccionActualizada: produccionI = {
      ...produccion, // Copia todos los atributos de la producto original
      estado_rg: 0 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la produccion actualizada
    this.api.deleteProduccion(produccionActualizada).subscribe(() => {
      console.log('produccion eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getProduccion(); // Actualizar la lista de Produccion después de eliminar
    }, (error) => {
      console.error('Error al eliminar el producto:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
  }
  activarProduccion(produccion: produccionI) {
    // Crear un nuevo objeto producto con el cambio en estado_rg
    const produccionActualizada: produccionI = {
      ...produccion, // Copia todos los atributos de la producto original
      estado_rg: 1 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la producto actualizada
    this.api.deleteProduccion(produccionActualizada).subscribe(() => {
      console.log('Produccion eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getProduccion(); // Actualizar la lista de usuarios después de eliminar
    }, (error) => {
      console.error('Error al eliminar la produccion:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
 
  }
 

 

}
