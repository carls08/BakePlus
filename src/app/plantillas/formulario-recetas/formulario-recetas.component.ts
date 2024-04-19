import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { formularioRecetaI } from 'src/app/models/formulario-receta.interface';
import { ModalService } from 'src/app/services/modal.service';
import { RecetaI } from 'src/app/models/receta.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';
@Component({
  selector: 'app-formulario-recetas',
  templateUrl: './formulario-recetas.component.html',
  styleUrls: ['./formulario-recetas.component.css'],
})
export class FormularioRecetasComponent {
  nuevoFormReceta: FormGroup;

  recetas: any = [];
  valorI: any = [];
  valorU: any = [];
  valorC: string = '';
  ingredientes: any = [];
  unidades: any = [];

  datos: any = {
    nombre_receta: '',
    cantidad_receta: 0,
    descripcion_receta: '',
    receta_ingrediente: [],
  };

  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  ingredientes_recetaSeleccionada: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,private modalServiceNgb: NgbModal
  ) {
    this.nuevoFormReceta = this.fb.group({
      nombre_receta: ['', Validators.required],
      cantidad_receta: ['', Validators.required],
      descripcion_receta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getReceta();
  }

  getReceta() {
    this.api.getAllRecetas().subscribe((data) => {
      console.log(data);
      this.recetas = data;
    });
  }
  onValorC() {
    return this.valorC;
  }

  onValorI() {
    this.valorI = this.valorI.split(',');
  }

  onValorU() {
    this.valorU = this.valorU.split(',');
  }

  agregar() {
    // Asegúrate de que la propiedad se llame 'ingrediente_receta' como en tu objeto inicial
    this.datos.receta_ingrediente.push({
      id_ingrediente: this.valorI[0],
      cantidad_ingrediente: this.valorC,
      id_unidad_medida: this.valorU[0],
    });

    this.recetas.push({
      ingrediente: this.valorI[1],
      cantidad: this.valorC,
      unidad: this.valorU[1],
    });
  }
  postForm(form: any) {
    this.datos.nombre_receta = form.nombre_receta;
    this.datos.cantidad_receta = form.cantidad_receta;
    this.datos.descripcion_receta = form.descripcion_receta;

    this.api.postRecetas(this.datos).subscribe((data) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Regitro incorrecto',
          footer: '<a href="">Intenta nuevamente</a>',
        });
      }
    });
  }

  salir() {
    this.router.navigate(['home']);
  }
  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  getCurrentPageItems(): formularioRecetaI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.recetas.slice(startIndex, endIndex);
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
    return Math.ceil(this.recetas.length / this.pageSize);
  }
  isFormValid(): boolean {
    return this.nuevoFormReceta.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
  abrirModalParaEditarItem(receta: RecetaI) {
    const modalRef = this.modalServiceNgb.open(EditarItemModalComponent);
    modalRef.componentInstance.item = receta;

    modalRef.result.then((result: RecetaI) => {
      if (result) {
        // Si se recibe un resultado (objeto modificado), puedes realizar las acciones necesarias aquí
        console.log('Objeto modificado:', result);
        // Por ejemplo, aquí puedes enviar los datos modificados a la API
        this.api.updateReceta(result).subscribe(() => {
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


