import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { productosI } from 'src/app/models/productos.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';
import Swal from 'sweetalert2';
import { RecetaI } from 'src/app/models/receta.interface';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  nuevoFormProducto:FormGroup;
  producto:any =[];
  receta: RecetaI[] = [];
  nombre_productoClicked:boolean=false;
  precio_productoClicked:boolean=false;
  cantidad_productoClicked:boolean=false;
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,private modalServiceNgb: NgbModal) {
    this.nuevoFormProducto = this.fb.group({
      id_receta:['',Validators.required],
      nombre_producto:['',Validators.required],
      precio_producto:['',Validators.required],
      cantidad_producto:['',Validators.required],
     
    });

  }

  ngOnInit():void{
this.getProductos();
this.getReceta();
  }
  getProductos() {
    this.api.getAllProductos().subscribe(data => {
      console.log(data)
      this.producto = data;
    })
  }
  getReceta() {
    this.api.getAllRecetas().subscribe({
      next: (data: RecetaI[]) => {
        this.receta = data;
        if (Array.isArray(data)) {
          this.receta = data;
        } else {
          this.receta = data;
        }
      },
      error: (error) => {
        console.error('Error al obtener recetas:', error);
      },
    });
  }

  insertProducto(producto: productosI) {
    console.log(producto);
    this.api.insertProductos(producto).subscribe(
      () => {
        console.log('producto insertada correctamente');
        Swal.fire({
          icon: 'success',
          title: 'Has ingresado',
          showConfirmButton: false,
          timer: 1000,
        });
        this.getProductos();
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

  validateNombre() {
    if (!this.nombre_productoClicked) {
      return false;
    }
    const nombre_productoControl =
      this.nuevoFormProducto.get('nombre_producto');
      if (nombre_productoControl?.errors  ) {
        return 'El nombre requerido.';
      } else if (nombre_productoControl?.value.length < 4) {
        return 'Al menos 4 caracteres.';
      }
    return null;
  }

  validatePrecio() {
    if (!this.precio_productoClicked) {
      return false;
    }
    const precio_productoControl = this.nuevoFormProducto.get('precio_producto');
    if (precio_productoControl?.errors && precio_productoControl?.value.toString().length == 0 ) {
      return 'El precio es requerido.';
    } else if (precio_productoControl?.value.valuetoString().length < 1) {
      return 'Al menos 4 caracteres.';
    }

    return null;
  }
  validateCantidad() {
    if (!this.cantidad_productoClicked) {
      return false;
    }
    const cantidad_productoControl = this.nuevoFormProducto.get('cantidad_producto');
    if (cantidad_productoControl?.errors  && cantidad_productoControl?.value.toString().length==0 ) {
      return 'La cantidad es requerido.';
    } else if (cantidad_productoControl?.value.valuetoString().length < 1) {
      return 'Al menos 4 caracteres.';
    }

    return null;
  }
  onNombre_productoClicked() {
    this.nombre_productoClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onPrecio_productoClicked() {
    this.precio_productoClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onCantidad_productoClicked() {
    this.cantidad_productoClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  getCurrentPageItems(): productosI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.producto.slice(startIndex, endIndex);
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
    return Math.ceil(this.producto.length / this.pageSize);
  }

  isFormValid(): boolean {
    return this.nuevoFormProducto.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
  desactivarProducto(producto: productosI) {
    // Crear un nuevo objeto Uproducto con el cambio en estado_rg
    const productoActualizada: productosI = {
      ...producto, // Copia todos los atributos de la producto original
      estado_rg: 0 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la producto actualizada
    this.api.deleteProducto(productoActualizada).subscribe(() => {
      console.log('producto eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getProductos(); // Actualizar la lista de productos después de eliminar
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
  activarProducto(producto: productosI) {
    // Crear un nuevo objeto producto con el cambio en estado_rg
    const productoActualizada: productosI = {
      ...producto, // Copia todos los atributos de la producto original
      estado_rg: 1 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la producto actualizada
    this.api.deleteProducto(productoActualizada).subscribe(() => {
      console.log('producto eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getProductos(); // Actualizar la lista de usuarios después de eliminar
    }, (error) => {
      console.error('Error al eliminar el usuario:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
 
  }
  abrirModalParaEditarItem(producto: productosI) {
    const modalRef = this.modalServiceNgb.open(EditarItemModalComponent);
    modalRef.componentInstance.item = producto;

    modalRef.result.then((result: productosI) => {
      if (result) {

        // Si se recibe un resultado (objeto modificado), puedes realizar las acciones necesarias aquí
        console.log('Objeto modificado:', result);
        // Por ejemplo, aquí puedes enviar los datos modificados a la API
        this.api.updateProducto(result).subscribe(() => {
          console.log('producto actualizada correctamente');
        }, (error) => {
          console.error('Error al actualizar la producto:', error);
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
