import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { permisosI } from 'src/app/models/permisos.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLooggedIn: boolean = false;
  loggedInUsername: string | null = null;
  isAuthenticated: boolean = false;
  permisos: permisosI[] | null = [];

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificar si el usuario está autenticado
        this.isAuthenticated = this.authService.isAuthenticated();
        if (this.isAuthenticated) {
          // Obtener el nombre de usuario autenticado
          this.loggedInUsername = this.authService.getLoggedInUsername();
          this.permisos = this.authService.getPermisosUsuario();
        }
      }
    });
  }
  registro() {
    this.router.navigate(['registro']);
  }
  home() {
    this.router.navigate(['home']);
  }
  login() {
    this.router.navigate(['login']);
  }
  receta() {
    this.router.navigate(['receta']);
  }
  formularioReceta() {
    this.router.navigate(['formularioReceta']);
  }
  unidades() {
    this.router.navigate(['unidades']);
  }
  marcas() {
    this.router.navigate(['marcas']);
  }
  ingredientes() {
    this.router.navigate(['ingredientes']);
  }
  estadisticas() {
    this.router.navigate(['estadisticas']);
  }
  dashboard() {
    this.router.navigate(['dashboard']);
  }
  productos() {
    this.router.navigate(['productos']);
  }
  produccion() {
    this.router.navigate(['produccion']);
  }
  addVenta() {
    this.router.navigate(['ventas']);
  }
  salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('ingredientes');
    localStorage.removeItem('unidades');
    localStorage.removeItem('permisos_usuarios');
    this.router.navigate(['login']);
  }

  permisoAddUser(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_USER') ?? false;
  }

  permisoUpdateUser(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_USER') ?? false;
  }

  permisoListUser(): boolean {
    if (this.permisos?.some((p) => p.name === 'LIST_USER')) return true;
    else {
      return false;
    }
  }

  permisoDeleteUser(): boolean {
    return this.permisos?.some((p) => p.name === 'DELETE_USER') ?? false;
  }

  permisoAddRecipe(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_RECIPE') ?? false;
  }

  permisoUpdateRecipe(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_RECIPE') ?? false;
  }

  permisoListRecipe(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_RECIPE') ?? false;
  }

  permisoDeleteRecipe(): boolean {
    return this.permisos?.some((p) => p.name === 'DELETE_RECIPE') ?? false;
  }

  permisoAddSale(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_SALE') ?? false;
  }

  permisoUpdateSale(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_SALE') ?? false;
  }

  permisoListSale(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_SALE') ?? false;
  }

  permisoDeleteSale(): boolean {
    return this.permisos?.some((p) => p.name === 'DELETE_SALE') ?? false;
  }

  permisoAddRol(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_ROL') ?? false;
  }

  permisoUpdateRol(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_ROL') ?? false;
  }

  permisoListRol(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_ROL') ?? false;
  }

  permisoDeleteRol(): boolean {
    return this.permisos?.some((p) => p.name === 'DELETE_ROL') ?? false;
  }

  permisoAddBrand(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_BRAND') ?? false;
  }

  permisoUpdateBrand(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_BRAND') ?? false;
  }

  permisoListBrand(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_BRAND') ?? false;
  }

  permisoDeleteBrand(): boolean {
    return this.permisos?.some((p) => p.name === 'DELETE_BRAND') ?? false;
  }

  permisoAddIngredient(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_INGREDIENT') ?? false;
  }

  permisoUpdateIngredient(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_INGREDIENT') ?? false;
  }

  permisoListIngredient(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_INGREDIENT') ?? false;
  }

  permisoDeleteIngredient(): boolean {
    return this.permisos?.some((p) => p.name === 'DELETE_INGREDIENT') ?? false;
  }

  permisoAddMeasureUnits(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_MEASURE_UNITS') ?? false;
  }

  permisoUpdateMeasureUnits(): boolean {
    return (
      this.permisos?.some((p) => p.name === 'UPDATE_MEASURE_UNITS') ?? false
    );
  }

  permisoListMeasureUnits(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_MEASURE_UNITS') ?? false;
  }

  permisoDeleteMeasureUnits(): boolean {
    return (
      this.permisos?.some((p) => p.name === 'DELETE_MEASURE_UNITS') ?? false
    );
  }

  permisoAddProduct(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_PRODUCT') ?? false;
  }

  permisoUpdateProduct(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_PRODUCT') ?? false;
  }

  permisoListProduct(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_PRODUCT') ?? false;
  }

  permisoDeleteProduct(): boolean {
    return this.permisos?.some((p) => p.name === 'DELETE_PRODUCT') ?? false;
  }

  permisoAddProduction(): boolean {
    return this.permisos?.some((p) => p.name === 'ADD_PRODUCTION') ?? false;
  }

  permisoUpdateProduction(): boolean {
    return this.permisos?.some((p) => p.name === 'UPDATE_PRODUCTION') ?? false;
  }

  permisoListProduction(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_PRODUCTION') ?? false;
  }

  permisoDeleteProduction(): boolean {
    const tienePermiso =
      this.permisos?.some((p) => p.name === 'DELETE_PRODUCTION') ?? false;
    console.log('¿Tiene permiso para eliminar producción?', tienePermiso);
    return tienePermiso;
  }
  permisolistStatistics(): boolean {
    return this.permisos?.some((p) => p.name === 'LIST_STATISTICS') ?? false;
  }
}
