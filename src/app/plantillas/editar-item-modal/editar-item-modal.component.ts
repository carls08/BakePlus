import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Ajusta la importación según la librería de modals que estés utilizando

@Component({
  selector: 'app-editar-item-modal',
  templateUrl: './editar-item-modal.component.html',
  styleUrls: ['./editar-item-modal.component.css']
})
export class EditarItemModalComponent {
  
  @Input() marca: any; // Recibe la información de la marca desde el servicio ModalService

  constructor(public activeModal: NgbActiveModal) { } // Inyecta NgbActiveModal en el constructor

  guardarCambios() {
    // Aquí puedes implementar la lógica para guardar los cambios en la marca
    // Luego, cierra el modal
    this.activeModal.close('Guardado');
  }

  cerrarModal() {
    // Cierra el modal sin guardar cambios
    this.activeModal.dismiss('Cerrar');
  }
}

