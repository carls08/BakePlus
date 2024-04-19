import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './plantillas/home/home.component';
import { RegistroComponent } from './plantillas/registro/registro.component';
import { LoginComponent } from './vistas/login/login.component';
import { RecetasComponent } from './plantillas/recetas/recetas.component';
import { DescripcionRecetaComponent } from './plantillas/descripcion-receta/descripcion-receta.component';
import { FormularioRecetasComponent } from './plantillas/formulario-recetas/formulario-recetas.component';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { UnidadesComponent } from './plantillas/unidades/unidades.component';
import { VentasComponent } from './plantillas/ventas/ventas.component';
import { MarcasComponent } from './plantillas/marcas/marcas.component';
import { IngredientesComponent } from './plantillas/ingredientes/ingredientes.component';
import { AuthGuard } from './auth.guard';
import { EstadisticasComponent } from './plantillas/estadisticas/estadisticas.component';
import { TableroComponent } from './plantillas/tablero/tablero.component';
import { ProductosComponent } from './plantillas/productos/productos.component';
import { ProduccionComponent } from './plantillas/produccion/produccion.component';


const routes:Routes=[
  {path:'registro',component:RegistroComponent,canActivate: [AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'receta',component:RecetasComponent,canActivate: [AuthGuard]},
  {path:'descripcion/:id',component:DescripcionRecetaComponent,canActivate: [AuthGuard]},
  {path:'formularioReceta',component:FormularioRecetasComponent,canActivate: [AuthGuard]},
  {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
  {path:'plantillas',component:PlantillasComponent,canActivate: [AuthGuard]},
  {path:'unidades',component:UnidadesComponent,canActivate: [AuthGuard]},
  {path:'ventas',component:VentasComponent,canActivate: [AuthGuard]},
  {path:'marcas',component:MarcasComponent,canActivate: [AuthGuard]},
  {path:'ingredientes',component:IngredientesComponent,canActivate: [AuthGuard]},
  {path:'estadisticas',component:EstadisticasComponent,canActivate: [AuthGuard]},
  {path:'dashboard',component:TableroComponent,canActivate: [AuthGuard]},
  {path:'productos',component:ProductosComponent,canActivate:[AuthGuard]},
  {path:'produccion',component:ProduccionComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'home' } // Redireccionar a la página de inicio si la ruta no coincide con ninguna de las anteriores
]
@NgModule({
 
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,]
