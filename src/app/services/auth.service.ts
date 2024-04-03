import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

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
}
