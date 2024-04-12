import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaI } from 'src/app/models/receta.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal.service';

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
    private modalService: ModalService
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
abrirModalParaEditarItem(recetas: any) {
  this.recetaSeleccionada = recetas;
  // Abre el modal aquí, por ejemplo, utilizando el servicio ModalService
  this.modalService.abrirModalEditar(recetas);
}


verReceta(){
  this.router.navigate(['descripcion'])

}
}
