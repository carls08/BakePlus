import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { formularioRecetaI } from 'src/app/models/formulario-receta.interface';

@Component({
  selector: 'app-formulario-recetas',
  templateUrl: './formulario-recetas.component.html',
  styleUrls: ['./formulario-recetas.component.css']
})
export class FormularioRecetasComponent {
  nuevoFormReceta: FormGroup;
  ingredientes_receta:any=[]
  valorI:any=[];
  valorU:any=[];
  valorC:string='';
  ingredientes:any=[]
  unidades:any=[]

  datos:any ={
    "nombre_receta":"",
    "cantidad_receta":0,
    "descripcion_receta":"",
    "receta_ingrediente" : []
  }

  constructor(
      private api:ApiService,
      private router:Router,
      private fb:FormBuilder
    ){
    this.nuevoFormReceta=this.fb.group({
      nombre_receta:['',Validators.required],
      cantidad_receta:['',Validators.required],
      descripcion_receta:['',Validators.required],
    })
  }

  ngOnInit():void {
    this.api.getAllIngredientes().subscribe(data =>{
      this.ingredientes = data
    })

    this.api.getAllUnidades().subscribe(data =>{
      this.unidades = data
    })
  }

  onValorC(){
    return this.valorC  
  }

  onValorI(){
   this.valorI = this.valorI.split(',')
  }

  onValorU(){
    this.valorU = this.valorU.split(',')
  }

  agregar() {
    // Asegúrate de que la propiedad se llame 'ingrediente_receta' como en tu objeto inicial
    this.datos.receta_ingrediente.push({
      'id_ingrediente': this.valorI[0],
      'cantidad_ingrediente': this.valorC,
      'id_unidad_medida': this.valorU[0]
    });

    this.ingredientes_receta.push({
      'ingrediente': this.valorI[1],
      'cantidad': this.valorC,
      'unidad': this.valorU[1]
    })
  }

postForm(form:any){
this.datos.nombre_receta=form.nombre_receta
this.datos.cantidad_receta=form.cantidad_receta
this.datos.descripcion_receta=form.descripcion_receta

this.api.postRecetas(this.datos).subscribe(data =>{
  if(data){
    Swal.fire({
      icon: "success",
      title: "Registro Exitoso",
      showConfirmButton: false,
      timer: 1500
    });
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Regitro incorrecto",
      footer: '<a href="">Intenta nuevamente</a>'
    });
  }
})

}
salir(){
  this.router.navigate(['home'])
}
   
}
