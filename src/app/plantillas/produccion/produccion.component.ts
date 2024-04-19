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

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent {
  nuevoFormProduccion:FormGroup;
  produccion:any=[];
  producto: productosI[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  isAuthenticated: boolean = false;
  loggedInUsername: string | null = null;
  permisos: permisosI[] | null = [];
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,private modalServiceNgb: NgbModal,private authService: AuthService) {
    this.nuevoFormProduccion = this.fb.group({
    
      id_producto:['',Validators.required],
      cantidad_produccion:['',Validators.required],
      fecha:['',Validators.required]
     
    });

  }

  ngOnInit():void{
    this.getProduccion();
    
    
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
  
  insertProduccion(produccion: produccionI) {
    console.log(produccion);
    this.api.insertProduccion(produccion).subscribe(
      () => {
        console.log('produccion insertada correctamente');
        Swal.fire({
          icon: 'success',
          title: 'Has ingresado',
          showConfirmButton: false,
          timer: 1000,
        });
        this.getProduccion();
      },
      (error) => {
        console.error('Error al insertar la marca:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrecto',
          footer: '<a href="">Intenta nuevamente</a>',
        });
      }
    );
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
  abrirModalParaEditarItem(producto: produccionI) {
    const modalRef = this.modalServiceNgb.open(EditarItemModalComponent);
    modalRef.componentInstance.item = producto;

    modalRef.result.then((result: produccionI) => {
      if (result) {

        // Si se recibe un resultado (objeto modificado), puedes realizar las acciones necesarias aquí
        console.log('Objeto modificado:', result);
        // Por ejemplo, aquí puedes enviar los datos modificados a la API
        this.api.updateProduccion(result).subscribe(() => {
          console.log('Produccion actualizada correctamente');
        }, (error) => {
          console.error('Error al actualizar la Produccion:', error);
        });
      } else {
        // Si no se recibe un resultado (se cerró el modal sin cambios), puedes manejarlo aquí
        console.log('Se cerró el modal sin cambios');
      }
    }).catch((error) => {
      console.error('Error al cerrar el modal:', error);
    });

  }


}
