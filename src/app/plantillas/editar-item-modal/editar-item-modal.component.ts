import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-editar-item-modal',
  templateUrl: './editar-item-modal.component.html',
  styleUrls: ['./editar-item-modal.component.css']
})
export class EditarItemModalComponent implements OnInit {
  item: any;
  campos: any[] = [];

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.abrirEditarItemModal$.subscribe(({ item, campos }) => {
      this.item = item;
      this.campos = campos;
      // Aquí puedes realizar cualquier otra lógica necesaria para inicializar el modal con los datos proporcionados
    });
  }
}
