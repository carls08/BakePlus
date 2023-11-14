import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-recetas',
  templateUrl: './formulario-recetas.component.html',
  styleUrls: ['./formulario-recetas.component.css']
})
export class FormularioRecetasComponent {
   prueba=[{"Ingrediente":"", "Cantidad":""}]
    
   inputTipo:string="";
   inputCantidad:number = 0;
   inputUnidad:string=""; 

   agregar(){
    this.prueba.push({"Ingrediente":this.inputTipo, "Cantidad":this.inputCantidad+" "+this.inputUnidad});
    Swal.fire({
    
      icon: "success",
      title: "Se ha agregado correctamemte",
      showConfirmButton: false,
      timer: 1500
    });
   }

   
}
