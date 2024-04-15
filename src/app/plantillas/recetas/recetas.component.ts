import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaI } from 'src/app/models/receta.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal.service';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent {
  recetas:any=[]
  recetasClicked:boolean = false;
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  recetaSeleccionada :any;
  constructor(
    private router:Router,
    private api:ApiService,
    private modalService: ModalService,
    private modalServiceNgb: NgbModal // Inyecta NgbModal
  ){}
descripcion(){
  this.router.navigate(['descripcion'])
}
salir(){
  this.router.navigate(['home'])
}
ngOnInit():void{
  this.api.getAllRecetas().subscribe(data => {
    console.log(data);
    this.recetas=data;
  })
}
getCurrentPageItems(): RecetaI[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.recetas.slice(startIndex, endIndex);
}
getTotalPages(): number {
  return Math.ceil(this.recetas.length / this.pageSize);
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
abrirModalParaEditarItem(receta: any) {
  const modalRef = this.modalServiceNgb.open(EditarItemModalComponent);
  modalRef.componentInstance.item = receta;

  modalRef.result.then((result) => {
    if (result) {
      // Si se recibe un resultado (objeto modificado), puedes realizar las acciones necesarias aquí
      console.log('Objeto modificado:', result);
      // Por ejemplo, aquí puedes enviar los datos modificados a la API
      this.api.updateRecetas(result).subscribe(() => {
        console.log('Receta actualizada correctamente');
      }, (error) => {
        console.error('Error al actualizar la receta:', error);
      });
    } else {
      // Si no se recibe un resultado (se cerró el modal sin cambios), puedes manejarlo aquí
      console.log('Se cerró el modal sin cambios');
    }
  }).catch((error) => {
    console.error('Error al cerrar el modal:', error);
  });
}


verReceta(){
  this.router.navigate(['descripcion'])

}
}
