import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModal y NgbModalRef si estás utilizando Angular Bootstrap
import { EditarItemModalComponent } from '../plantillas/editar-item-modal/editar-item-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: NgbModalRef | null = null; // Referencia al modal actual, inicializada como null

  constructor(private modalService: NgbModal) { } // Inyecta NgbModal en el constructor

  abrirModalEditar(marca: any) {
    // Abre el modal y pasa la información de la marca
    this.modalRef = this.modalService.open(EditarItemModalComponent);
    this.modalRef.componentInstance.marca = marca; // Pasa la marca al componente del modal
  }

  cerrarModal() {
    // Cierra el modal si está abierto
    if (this.modalRef !== null) {
      this.modalRef.close();
    }
  }
}