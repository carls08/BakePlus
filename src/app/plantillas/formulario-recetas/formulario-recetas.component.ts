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
  valorI:string='';
  valorU:string='';
  valorC:string='';

  constructor(private api:ApiService, private router:Router,private fb:FormBuilder){
    this.nuevoFormReceta=this.fb.group({
      nombre_receta:['',Validators.required],
      cantidad_receta:['',Validators.required],
      descripcion_receta:['',Validators.required],

      

    })
  }
  onValorC(){
    console.log('valor',this.valorC)
    
  }
  onValorI(){
    console.log('valor',this.valorI)
    
  }
  onValorU(){
    console.log('valor',this.valorU)
    
  }
  ngOnInit():void {

  }

  agregar(){
    
   this.ingredientes_receta.push({
    'id_ingrediente':this.onValorI,
    'cantidad_ingrediente':this.onValorC,
    'id_unidad_medida':this.onValorU
   })
  
   }


postForm(form:any){
console.log(form)
}
salir(){
  this.router.navigate(['home'])
}
   
}
