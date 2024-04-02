import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditarItemModalComponent } from '../plantillas/editar-item-modal/editar-item-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) { }

  abrirModalEditar(item: any) {
    this.modalRef = this.modalService.open(EditarItemModalComponent);
    this.modalRef.componentInstance.item = item;
  }

  cerrarModal() {
    if (this.modalRef !== null) {
      this.modalRef.close();
    }
  }
}