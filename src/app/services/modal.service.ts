import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private abrirEditarItemModalSubject = new Subject<any>();

  abrirEditarItemModal$ = this.abrirEditarItemModalSubject.asObservable();

  abrirEditarItemModal(item: any, campos: any[]) {
    this.abrirEditarItemModalSubject.next({ item, campos });
  }
}