import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UnidadesI } from 'src/app/models/unidades.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

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
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  unidad_medidaSeleccionada: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,private modalService: ModalService) {
    this.nuevoUnidad = this.fb.group({
      abreviatura_unidad_medida: ['', Validators.required],
      nombre_unidad_medida: ['', Validators.required]

    })

  }
  ngOnInit(): void {
    this.getUnidad()
  }

  getUnidad() {
    
    this.api.getAllUnidades().subscribe(data => {
      console.log(data);
      this.unidad_medida=data;
    })
  }
  insertUnidad(unidad: UnidadesI) {
    this.api. insertUnidad(unidad).subscribe(() => {
      console.log('Marca insertada correctamente');
      Swal.fire({
        icon: "success",
        title: "Has ingresado",
        showConfirmButton: false,
        timer: 1000
      });
      this.getUnidad()
    },(error) => {
      console.error('Error al insertar la marca:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrecto",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    } );
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
}else if(abreviatura_unidad_medidaControl?.value.length < 0){
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
    }else if(nombre_unidad_medidaControl?.value.length < 2){
      return 'Al menos dos caracter';
    
    }
    return null;
      }
 
  onAbreviatura_unidad_medidaClicked(){
    this.abreviatura_unidad_medidaClicked=true;
  }
  onNombre_unidad_medidaClicked(){
    this.nombre_unidad_medidaClicked=true;
  }
  
  getCurrentPageItems(): UnidadesI[]{
const startIndex = (this.currentPage - 1)*this.pageSize;
const endIndex = startIndex + this.pageSize;
return this.unidad_medida.slice(startIndex, endIndex);
  }
  getTotalPages():number{
    return Math.ceil(this.unidad_medida.length/this.pageSize);
  }
  getPages():number[]{
    const totalPages=this.getTotalPages();
    return Array.from({length:totalPages},(_,index)=> index + 1);
  }
  goToPage(page:number){
    if (page >= 1 && page <= this.getTotalPages()){
      this.currentPage=page;
    }
  }
nextPage(){
  if(this.currentPage < this.getTotalPages()){
    this.currentPage++;
  }
}
previousPage(){
  if(this.currentPage > 1 ){
    this.currentPage--;
  }
}
abrirModalParaEditarItem(unidad_medida: any) {
  this.unidad_medidaSeleccionada = unidad_medida;
  // Abre el modal aquí, por ejemplo, utilizando el servicio ModalService
  this.modalService.abrirModalEditar(unidad_medida);
}
}
