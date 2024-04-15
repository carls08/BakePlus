import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-item-modal',
  templateUrl: './editar-item-modal.component.html',
  styleUrls: ['./editar-item-modal.component.css']
})
export class EditarItemModalComponent {
  @Input() item: any; // Objeto genérico para editar
  itemModificado: any; // Objeto modificado

  constructor(public activeModal: NgbActiveModal) { }

  guardarCambios() {
    // Implementa la lógica para guardar los cambios en el objeto genérico
    // Aquí puedes realizar las validaciones necesarias antes de cerrar el modal
    // Por ejemplo:
    // if (validacionesPasadas) {
    this.activeModal.close(this.item);
    // } else {
    //   // Muestra un mensaje de error o evita cerrar el modal
    // }
  }

  cerrarModal() {
    // Cierra el modal sin guardar cambios
    this.activeModal.dismiss('Cerrar sin cambios');
  }

  // Función para obtener las claves de un objeto
  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}

