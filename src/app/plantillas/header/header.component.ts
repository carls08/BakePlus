import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLooggedIn: boolean = false;

  constructor(
    private router:Router
  ){
  }
  registro(){
    this.router.navigate(['registro'])
  }
  login(){
    this.router.navigate([''])
  }  
  receta(){
    this.router.navigate(['receta'])
  }
  formularioReceta(){
    this.router.navigate(['formularioReceta'])
  }
  unidades(){
    this.router.navigate(['unidades'])
  }
  marcas(){
    this.router.navigate(['marcas'])
  }
  ingredientes(){
this.router.navigate(['ingredientes'])
  }
  salir(){
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
}
