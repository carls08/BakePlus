import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ingredientesI } from 'src/app/models/ingrediente.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { marcasI } from 'src/app/models/marcas.interface';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css'],
})
export class IngredientesComponent {
  nuevoIngredientes: FormGroup;
  marcas: marcasI[] = [];
  ingredientesClicked: boolean = false;
  marcasClicked: boolean = false;
  ingredientes: any = [];
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  ingredienteSeleccionada: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private modalService: ModalService,
    private modalServiceNgb: NgbModal
  ) {
    this.nuevoIngredientes = this.fb.group({
      nombre_ingrediente: ['', Validators.required],
      id_marca: ['', Validators.required],
      fecha_compra_ingrediente: ['', Validators.required],
      fecha_vencimiento_ingrediente: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getIngrediente(), this.getMarcas();
  }
  getIngrediente() {
    this.api.getAllIngredientes().subscribe((data) => {
      console.log(data);
      this.ingredientes = data;
    });
  }
  insertIngrediente(ingrediente: ingredientesI) {
    console.log(ingrediente);
    this.api.insertIngrediente(ingrediente).subscribe(
      () => {
        console.log('Ingrediente insertada correctamente');
        Swal.fire({
          icon: 'success',
          title: 'Has ingresado',
          showConfirmButton: false,
          timer: 1000,
        });
        this.getIngrediente();
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
  deleteIngrediente(ingrediente: ingredientesI) {
    this.api.deleteIngrediente(ingrediente).subscribe(
      () => {
        console.log('Marca eliminada correctamente');
        Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir esto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
        }).then((ingrediente) => {
          if (ingrediente.isConfirmed) {
            Swal.fire({
              title: 'Eliminado!',
              text: 'El registro ha sido eliminado.',
              icon: 'success',
            });
          }
        });
        this.getIngrediente();
      },
      (error) => {
        console.error('Error al eliminar la marca:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrecto',
          footer: '<a href="">Intenta nuevamente</a>',
        });
      }
    );
  }

  salir() {
    this.router.navigate(['home']);
  }
  validateIngredientes() {
    if (!this.ingredientesClicked) {
      return false;
    }
    const ingredientesControl =
      this.nuevoIngredientes.get('nombre_ingrediente');
    if (ingredientesControl?.errors && ingredientesControl?.value.length == 0) {
      return 'El nombre del ingrediente es requerido';
    } else if (ingredientesControl?.value.length < 3) {
      return 'Al menos 3 caracteres';
    }
    return null;
  }

  validateMarca() {
    if (!this.marcasClicked) {
      return false;
    }
    const marcaControl = this.nuevoIngredientes.get('id_marca');
    if (marcaControl?.value == '') {
      return 'Marca es requerida.';
    }

    return null;
  }
  onIngredientesClicked() {
    this.ingredientesClicked = true;
  }
  onMarcaClicked() {
    this.marcasClicked = true;
  }
  getCurrentPageItems(): ingredientesI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.ingredientes.slice(startIndex, endIndex);
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
  getMarcas() {
    this.api.getAllMarcas().subscribe({
      next: (data: marcasI[]) => {
        this.marcas = data;
        if (Array.isArray(data)) {
          this.marcas = data;
        } else {
          this.marcas = data;
        }
      },
      error: (error) => {
        console.error('Error al obtener marcas:', error);
      },
    });
  }
  getTotalPages(): number {
    return Math.ceil(this.ingredientes.length / this.pageSize);
  }
  isFormValid(): boolean {
    return this.nuevoIngredientes.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  
  abrirModalParaEditarItem(ingrediente: ingredientesI) {
    const modalRef = this.modalServiceNgb.open(EditarItemModalComponent);
    modalRef.componentInstance.item = ingrediente;

    modalRef.result
      .then((result: ingredientesI) => {
        if (result) {
          // Si se recibe un resultado (objeto modificado), puedes realizar las acciones necesarias aquí
          console.log('Objeto modificado:', result);
          // Por ejemplo, aquí puedes enviar los datos modificados a la API
          this.api.updateIngrediente(result).subscribe(
            () => {
              console.log('Receta actualizada correctamente');
            },
            (error) => {
              console.error('Error al actualizar la receta:', error);
            }
          );
        } else {
          // Si no se recibe un resultado (se cerró el modal sin cambios), puedes manejarlo aquí
          console.log('Se cerró el modal sin cambios');
        }
      })
      .catch((error) => {
        console.error('Error al cerrar el modal:', error);
      });
  }
}
