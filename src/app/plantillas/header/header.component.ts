import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLooggedIn: boolean = false;
  loggedInUsername: string | null = null;

  constructor(private router:Router){

    this.loggedInUsername = this.getLoggedInUsername()

  }
  registro(){
    this.router.navigate(['registro'])
  }
  home(){
    this.router.navigate(['home'])
  }
  login(){
    this.router.navigate(['login'])
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
    localStorage.removeItem('nombre_usuario');
    this.router.navigate(['login'])
  }
  getLoggedInUsername(): string | null {
    return localStorage.getItem('nombre_usuario');
  }
}
