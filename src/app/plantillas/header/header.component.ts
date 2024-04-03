import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLooggedIn: boolean = false;
  loggedInUsername: string | null = null;
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        // Verificar si el usuario está autenticado
        this.isAuthenticated = this.authService.isAuthenticated();
        if (this.isAuthenticated) {
          // Obtener el nombre de usuario autenticado
          this.loggedInUsername = this.authService.getLoggedInUsername();
        }
      }
    });
  }
  registro() {
    this.router.navigate(['registro'])
  }
  home() {
    this.router.navigate(['home'])
  }
  login() {
    this.router.navigate(['login'])
  }
  receta() {
    this.router.navigate(['receta'])
  }
  formularioReceta() {
    this.router.navigate(['formularioReceta'])
  }
  unidades() {
    this.router.navigate(['unidades'])
  }
  marcas() {
    this.router.navigate(['marcas'])
  }
  ingredientes() {
    this.router.navigate(['ingredientes'])
  }
  salir() {
    localStorage.removeItem('token')
    localStorage.removeItem('nombre_usuario');
    this.router.navigate(['login'])
  }
}
