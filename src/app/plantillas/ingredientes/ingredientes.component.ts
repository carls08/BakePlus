import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ingredientesI } from 'src/app/models/ingrediente.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent {
  nuevoIngredientes: FormGroup;
  ingredientesClicked: boolean = false;
  ingredientes:any = [];
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  ingredienteSeleccionada :any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private modalService: ModalService) {
    this.nuevoIngredientes = this.fb.group({
      ingrediente: ['', Validators.required]
    })


  }
  ngOnInit(): void {
    this.api.getAllIngredientes().subscribe(data => {
      console.log(data);
      this.ingredientes=data;
    })
  }
  postIngrediente(form: any) {
    console.log(form)
  }
  salir(){
    this.router.navigate(['home'])
  }
  validateIngredientes(){
    if(!this.ingredientesClicked){return false}
    const ingredientesControl=  this.nuevoIngredientes.get('ingrediente');
    if(ingredientesControl?.errors && ingredientesControl?.value.length==0){
      return 'El nombre del ingrediente es requerido';

    } else if (ingredientesControl?.value.length < 3){
      return 'Al menos 3 caracteres';
    }
    return null
  }
  onIngredientesClicked(){
    this.ingredientesClicked=true;
  }
  getCurrentPageItems(): ingredientesI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.ingredientes.slice(startIndex, endIndex);
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
    return Math.ceil(this.ingredientes.length / this.pageSize);
  }
  abrirModalParaEditarItem(ingredientes: any) {
    this.ingredienteSeleccionada = ingredientes;
    // Abre el modal aquí, por ejemplo, utilizando el servicio ModalService
    this.modalService.abrirModalEditar(ingredientes);
  }
}
