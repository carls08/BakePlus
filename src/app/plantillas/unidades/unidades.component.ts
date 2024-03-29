import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UnidadesI } from 'src/app/models/unidades.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent {
  nuevoUnidad: FormGroup;
abreviatura_unidad_medidaClicked: boolean = false;
nombre_unidad_medidaClicked:boolean = false;
  unidad_medida:any = []
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.nuevoUnidad = this.fb.group({
      abreviatura_unidad_medida: ['', Validators.required],
      nombre_unidad_medida: ['', Validators.required]

    })

  }
  ngOnInit(): void {
    this.api.getAllUnidades().subscribe(data => {
      console.log(data);
      this.unidad_medida=data;
    })
  }

  postUnidad(form: any) {
    console.log(form)

  }
  salir(){
    this.router.navigate(['home'])
  }
  validateAbreviatura_unidad_medida(){
if(!this.abreviatura_unidad_medidaClicked){
  return false
}
const abreviatura_unidad_medidaControl = this.nuevoUnidad.get('abreviatura_unidad_medida');
if(abreviatura_unidad_medidaControl?.errors && abreviatura_unidad_medidaControl?.value.length==0){
return 'La abreviatura de la unidad es requeridad';
}else if(abreviatura_unidad_medidaControl?.value<1){
  return 'Al menos un caracter';

}
return null;
  }
  validateNombre_unidad_medida(){
    if(!this.nombre_unidad_medidaClicked){
      return false
    }
    const nombre_unidad_medidaControl = this.nuevoUnidad.get('nombre_unidad_medida');
    if(nombre_unidad_medidaControl?.errors && nombre_unidad_medidaControl?.value.length==0){
      console.log('prueba')
    return 'La abreviatura de la unidad es requeridad';
    }else if(nombre_unidad_medidaControl?.value<4){
      return 'Al menos cuatro caracter';
    
    }
    return null;
      }
 
  onAbreviatura_unidad_medidaClicked(){
    this.abreviatura_unidad_medidaClicked=true;
  }
  onNombre_unidad_medidaClicked(){
    this.nombre_unidad_medidaClicked=true;
  }
}
