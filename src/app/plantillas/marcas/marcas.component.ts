import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { marcasI } from 'src/app/models/marcas.interface';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent {

  nuevoMarca: FormGroup;
  nombre_marcaClicked: boolean = false;
  marcas: any = []
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  marcaSeleccionada: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private modalService: ModalService,
    private modalServiceNgb: NgbModal) {
    this.nuevoMarca = this.fb.group({
      nombre_marca: ['', Validators.required]
    })

  }
  ngOnInit(): void {

    this.getMarcas()

  }

  getMarcas(){
    this.api.getAllMarcas().subscribe(data => {
      this.marcas = data;
    })
  }

  insertMarca(marca: marcasI) {
    this.api.insertMarca(marca).subscribe(() => {
      console.log('Marca insertada correctamente');
      Swal.fire({
        icon: "success",
        title: "Has ingresado",
        showConfirmButton: false,
        timer: 1000
      });
      this.getMarcas()
    }, (error) => {
      console.error('Error al insertar la marca:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrecto",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
  }

  desactivarMarca(marca: marcasI) {
    // Crear un nuevo objeto marca con el cambio en estado_rg
    const marcaActualizada: marcasI = {
      ...marca, // Copia todos los atributos de la marca original
      estado_rg: 0 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la marca actualizada
    this.api.deleteMarca(marcaActualizada).subscribe(() => {
      console.log('Marca eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getMarcas(); // Actualizar la lista de marcas después de eliminar
    }, (error) => {
      console.error('Error al eliminar la marca:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
  }
  activarMarca(marca: marcasI) {
    // Crear un nuevo objeto marca con el cambio en estado_rg
    const marcaActualizada: marcasI = {
      ...marca, // Copia todos los atributos de la marca original
      estado_rg: 1 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la marca actualizada
    this.api.deleteMarca(marcaActualizada).subscribe(() => {
      console.log('Marca eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getMarcas(); // Actualizar la lista de marcas después de eliminar
    }, (error) => {
      console.error('Error al eliminar la marca:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
  }

  salir() {
    this.router.navigate(['home'])
  }
  validateNombre_marca() {
    if (!this.nombre_marcaClicked) {
      return false
    }
    const nombre_marcaControl = this.nuevoMarca.get('nombre_marca');
    if (nombre_marcaControl?.errors && nombre_marcaControl?.value.length == 0) {
      return 'El nombre de la marca es requerido';
    } else if (nombre_marcaControl?.value.length < 3) {
      return 'Al menos 3 caracteres';
    }
    return null;
  }
  onNombre_marcaClicked() {
    this.nombre_marcaClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  getCurrentPageItems(): marcasI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.marcas.slice(startIndex, endIndex);
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
    return Math.ceil(this.marcas.length / this.pageSize);
  }
  isFormValid(): boolean {
    return this.nuevoMarca.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
  abrirModalParaEditarItem(marca: marcasI) {
    const modalRef = this.modalServiceNgb.open(EditarItemModalComponent);
    modalRef.componentInstance.item = marca;

    modalRef.result.then((result: marcasI) => {
      if (result) {
        // Si se recibe un resultado (objeto modificado), puedes realizar las acciones necesarias aquí
        console.log('Objeto modificado:', result);
        // Por ejemplo, aquí puedes enviar los datos modificados a la API
        this.api.updateMarcas(result).subscribe(() => {
          console.log('Marca actualizada correctamente');
        }, (error) => {
          console.error('Error al actualizar la marca:', error);
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





