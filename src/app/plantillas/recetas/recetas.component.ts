import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent {
  recetas:any=[]
  constructor(
    private router:Router,
    private api:ApiService
  ){}
descripcion(){
  this.router.navigate(['descripcion'])
}
salir(){
  this.router.navigate(['home'])
}
ngOnInit():void{
  this.api.getAllReceta().subscribe(data => {
    console.log(data);
    this.recetas=data;
  })
}
}
