import { Injectable } from '@angular/core';
import { permisosI } from '../models/permisos.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Verifica si el token está presente y no ha expirado
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenPayload.exp * 1000);
      return expirationDate > new Date(); // Retorna true si el token no ha expirado
    }
    return false; // Retorna false si no hay token o ha expirado
  }
  getLoggedInUsername(): string | null {
    return localStorage.getItem('nombre_usuario');
  }
  getLoggedInIdUser(): number{
    let id = parseInt(localStorage.getItem('id_usuario'));
    return id;
  }
  getPermisosUsuario(): permisosI[] | null {
    const permisosJSON = localStorage.getItem('permisos_usuario');
    if (permisosJSON) {
      // Si hay datos, parsearlos de JSON a un array de permisos
      const permisos: permisosI[] = JSON.parse(permisosJSON);
      // Devolver el array de permisos
      return permisos;
    } else {
      // Si no hay datos, devolver null
      return null;
    }
  }
}
