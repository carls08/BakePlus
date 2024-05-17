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
import { RecetaI, RecetaIngedienteI } from 'src/app/models/receta.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';
import { ingredientesI } from 'src/app/models/ingrediente.interface';
import { UnidadesI } from 'src/app/models/unidades.interface';
import { IngredienteRecetaI } from 'src/app/models/IngredienteReceta.interface';
import { tablaIngreReceI } from 'src/app/models/tablaIngreRec.interface';
@Component({
  selector: 'app-formulario-recetas',
  templateUrl: './formulario-recetas.component.html',
  styleUrls: ['./formulario-recetas.component.css'],
})
export class FormularioRecetasComponent {

  activeTab: string = 'registro'; // Puedes establecer 'registro' como pestaña activa por defecto

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
  nuevoFormReceta: FormGroup;

  recetaIngediente: RecetaIngedienteI;
  recetas: RecetaI[] = []
  nuevaReceta: formularioRecetaI
  ingredientes: ingredientesI[] = [];
  unidades: UnidadesI[] = [];
  ingredienteReceta: IngredienteRecetaI[] = [];
  tablaIngredientes: tablaIngreReceI[] = [];
  unidadSeleccionada: UnidadesI;
  ingredienteSeleccionado: ingredientesI;
  nombreClicked: boolean = false;
  cantidadRecetaClicked: boolean = false;
  descripcionClicked: boolean = false;
  cantidadIngedienteClicked: boolean = false;
  status_form: number = 0
  datos: any = {
    nombre_receta: '',
    cantidad_receta: 0,
    descripcion_receta: '',
    receta_ingrediente: [],
  };

  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService, private modalServiceNgb: NgbModal
  ) {
    this.nuevoFormReceta = this.fb.group({
      nombre_receta: ['', Validators.required],
      cantidad_receta: ['', Validators.required],
      descripcion_receta: ['', Validators.required],
      cantidad_ingrediente: ['', Validators.required],
      medida_ingrediente: ['', Validators.required],
      nombre_ingrediente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getReceta()
    this.getAllInngredientes()
    this.getAllUnidades()
  }
  tipoAccion(accion: number, id_receta?: number) {
    this.status_form = accion;
    if (accion == 1) {
      this.getRecetaingrediente(id_receta)
    } else {
      this.nuevoFormReceta.patchValue({
        'nombre_receta': '',
        'cantidad_receta': '',
        'descripcion_receta': '',
        'cantidad_ingrediente': '',
        'medida_ingrediente': '',
        'nombre_ingrediente': ''

      });
    }
  }

  getReceta() {
    this.api.getAllRecetas().subscribe((data) => {
      this.recetas = data;
    });
  }

  getRecetaingrediente(id_receta: number) {
    this.api.getRecetaIngedientes(id_receta).subscribe((data) => {
      this.recetaIngediente = data;
      console.log('Receta Ingediente:', this.recetaIngediente);
    }, error => {
      console.error('Error fetching recipe ingredients:', error);
    });
  }

  getAllUnidades() {
    this.api.getAllUnidades().subscribe(data => {
      this.unidades = data;
    })
  }
  getAllInngredientes() {
    this.api.getAllIngredientes().subscribe(data => {
      this.ingredientes = data;
    })
  }
  // Método para manejar la selección de unidad de medida
  onUnidadMedidaSelected(abreviatura: string) {
    for (let u of this.unidades) {
      if (u.abreviatura_unidad_medida === abreviatura) {
        this.unidadSeleccionada = u;
        break; // Terminamos el bucle ya que hemos encontrado la unidad seleccionada
      }
    }
  }

  // Método para manejar la selección de ingrediente
  onIngredienteSelected(nombreIngrediente: string) {
    for (let i of this.ingredientes) {
      if (i.nombre_ingrediente === nombreIngrediente) {
        this.ingredienteSeleccionado = i;
        break; // Terminamos el bucle ya que hemos encontrado la unidad seleccionada
      }
    }
  }
  // Método para agregar un ingrediente a la tabla
  agregarIngrediente() {
    // Crea un objeto de la interfaz tablaIngreReceI y agrégalo al array tablaIngredientes
    const nuevoIngrediente: tablaIngreReceI = {
      cantidad_ingrediente: this.nuevoFormReceta.get('cantidad_ingrediente').value,
      id_unidad_medida: this.unidadSeleccionada.id_unidad_medida,
      abreviatura_unidad_medida: this.unidadSeleccionada.abreviatura_unidad_medida,
      id_ingrediente: this.ingredienteSeleccionado.id_ingrediente,
      nombre_ingrediente: this.ingredienteSeleccionado.nombre_ingrediente
    };
    this.tablaIngredientes.push(nuevoIngrediente);

    // Reinicia los objetos seleccionados para permitir nuevas selecciones
    this.unidadSeleccionada = null;
    this.ingredienteSeleccionado = null;
  }

  registrarReceta() {

    // Mapea los datos de tablaIngredientes a ingredienteReceta
    this.ingredienteReceta = this.tablaIngredientes.map(tabla => {
      const ingrediente: IngredienteRecetaI = {
        id_ingrediente: parseInt(tabla.id_ingrediente),
        id_unidad_medida: parseInt(tabla.id_unidad_medida),
        cantidad_ingrediente: tabla.cantidad_ingrediente
      };
      return ingrediente;
    });

    this.nuevaReceta = {
      nombre_receta: this.nuevoFormReceta.get('nombre_receta').value,
      cantidad_receta: this.nuevoFormReceta.get('cantidad_receta').value,
      descripcion_receta: this.nuevoFormReceta.get('descripcion_receta').value,
      receta_ingrediente: this.ingredienteReceta,

    }
    this.api.postRecetas(this.nuevaReceta).subscribe(() => {
      console.log('Receta insertada correctamente');
      Swal.fire({
        icon: "success",
        title: "Completado!",
        showConfirmButton: false,
        timer: 1000
      });
    }, (error) => {
      console.error('Error al insertar la receta:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });

  }

  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  getCurrentPageItems(): RecetaI[] {
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

  validateNombre() {
    if (!this.nombreClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const nombreControl = this.nuevoFormReceta.get('nombre_receta');
    if (nombreControl?.errors && nombreControl?.value.length == 0) {
      return 'El nombre es requerido.';
    } else if (nombreControl?.value.length < 4) {
      return 'Al menos 4 caracteres.';
    }
    return null; // No hay error
  }

  validateCantidadReceta() {
    if (!this.cantidadRecetaClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const cantidadControl = this.nuevoFormReceta.get('cantidad_receta');
    if (cantidadControl?.errors && cantidadControl?.value.toString().length == 0) {
      return 'la cantidad es requerido';
    } else if (cantidadControl?.value.toString().length < 0) {
      return 'Al menos 1 numeros';
    }
    return null; // No hay error
  }
  validateDescripcion() {
    if (!this.descripcionClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const descripcionControl = this.nuevoFormReceta.get('descripcion_receta');
    if (descripcionControl?.errors && descripcionControl?.value.length == 0) {
      return 'Descripcion necesaria.';
    } else if (descripcionControl?.value.length < 10) {
      return 'Al menos 10 caracteres.';
    }
    return null; // No hay error
  }
  validateCantidadIngrediente() {
    if (!this.cantidadIngedienteClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const cantidadControl = this.nuevoFormReceta.get('cantidad_ingrediente');
    if (cantidadControl?.errors && cantidadControl?.value.toString().length == 0) {
      return 'la cantidad es requerido';
    } else if (cantidadControl?.value.toString().length < 0) {
      return 'Al menos 1 numeros';
    }
    return null; // No hay error
  }
  validateUnidadMedida(): string | null {
    const unidadMedida = this.nuevoFormReceta.get('unidad_medida');
    if (unidadMedida.errors && unidadMedida.errors['required']) {
      return 'Por favor, seleccione una unidad de medida.';
    }
    return null;
  }
  camposingredientesCompletos(): boolean {
    if (this.unidadSeleccionada != null && this.ingredienteSeleccionado != null && this.nuevoFormReceta.get('cantidad_ingrediente').valid)
      // Verifica si todos los campos están completos
      return true
    return false
  }

  fromCompleto(): boolean {

    if (this.nuevoFormReceta.get('nombre_receta').valid
      && this.nuevoFormReceta.get('cantidad_receta').valid
      && this.nuevoFormReceta.get('descripcion_receta').valid
      && this.nuevaReceta != null)
      return true
    return false
  }
  onNombreClicked() {
    this.nombreClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onCantidadReceClicked() {
    this.cantidadRecetaClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onDescripcionClicked() {
    this.descripcionClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onCantidadIngredienteReceClicked() {
    this.cantidadIngedienteClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  acdesReceta(receta: RecetaI, estado: number) {
    switch (estado) {
      case 0:
        const actualizar1: RecetaI = {
          ...receta,
          estado_rg: 0,
        }
        this.api.deleteReceta(actualizar1).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Realizado!',
              showConfirmButton: false,
              timer: 1000,
            });
            this.getReceta(); // Actualizar la lista de Usuarios después de eliminar
          },
          (error) => {
            console.error('Error en receta:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'ERROR',
              footer: '<a href="">Intenta nuevamente</a>',
            });
          }
        );

        break;
      case 1:
        const actualizar2: RecetaI = {
          ...receta,
          estado_rg: 1,
        }
        this.api.deleteReceta(actualizar2).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Realizado!',
              showConfirmButton: false,
              timer: 1000,
            });
            this.getReceta(); // Actualizar la lista de Usuarios después de eliminar
          },
          (error) => {
            console.error('Error en receta:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'ERROR',
              footer: '<a href="">Intenta nuevamente</a>',
            });
          }
        );

        break;

      default:
        break;
    }

  }
}

