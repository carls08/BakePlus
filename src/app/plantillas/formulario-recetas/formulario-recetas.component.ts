import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-recetas',
  templateUrl: './formulario-recetas.component.html',
  styleUrls: ['./formulario-recetas.component.css']
})
export class FormularioRecetasComponent {
  nuevoFormReceta: FormGroup;
  ingredientes_receta:any=[]

  constructor(private api:ApiService, private router:Router,private fb:FormBuilder){
    this.nuevoFormReceta=this.fb.group({
      nombre:['',Validators.required],
      cantidad:['',Validators.required],
      descripcion:['',Validators.required],

      

    })
  }

  agregar(){
   this.ingredientes_receta.push({
    'ingrediente_id':1,
    'cantidad':1,
    'unidad_medida':1
   })
  
   }


postForm(form:any){
console.log(form)
}
   
}
