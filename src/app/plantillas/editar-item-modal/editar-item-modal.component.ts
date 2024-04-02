import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-item-modal',
  templateUrl: './editar-item-modal.component.html',
  styleUrls: ['./editar-item-modal.component.css']
})
export class EditarItemModalComponent {
  @Input() item: any; // Objeto genérico para editar

  constructor(public activeModal: NgbActiveModal) { }

  guardarCambios() {
    // Implementa la lógica para guardar los cambios en el objeto genérico
    this.activeModal.close('Guardado');
  }

  cerrarModal() {
    // Cierra el modal sin guardar cambios
    this.activeModal.dismiss('Cerrar');
  }

  // Función para obtener las claves de un objeto
  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}

