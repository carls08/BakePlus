import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { marcasI } from 'src/app/models/marcas.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent {

  nuevoMarca: FormGroup;
  nombre_marcaClicked: boolean = false;
  marcas: any = []
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.nuevoMarca = this.fb.group({
      nombre_marca: ['', Validators.required]
    })

  }
  ngOnInit(): void {
    
    this.api.getAllMarcas().subscribe(data => {
      this.marcas=data;
    })
  }

  postMarca(form: any) {
    console.log(form)
  }
  salir(){
    this.router.navigate(['home'])
  }
validateNombre_marca(){
if (!this.nombre_marcaClicked){
  return false
}
const nombre_marcaControl = this.nuevoMarca.get('nombre_marca');
if( nombre_marcaControl?.errors && nombre_marcaControl?.value.length==0 ){
  return 'El nombre de la marca es requerido';
}else if(nombre_marcaControl?.value.length < 3){
  return 'Al menos 3 caracteres';
}
return null;
  }
  onNombre_marcaClicked(){
this.nombre_marcaClicked=true; // Marcar como true cuando se hace clic en el campo
  }
  getCurrentPageItems(): marcasI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.marcas.slice(startIndex, endIndex);
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
    return Math.ceil(this.marcas.length / this.pageSize);
  }
  }
  

  


