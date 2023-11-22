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


const routes:Routes=[
  //{path:'',redirectTo:'login', pathMatch:'full'},
  {path:'registro',component:RegistroComponent},
  {path:'',component:LoginComponent},
  {path:'receta',component:RecetasComponent},
  {path:'descripcion/:id',component:DescripcionRecetaComponent},
  {path:'formularioReceta',component:FormularioRecetasComponent},
  {path:'home',component:HomeComponent},
  {path:'plantillas',component:PlantillasComponent},
  {path:'unidades',component:UnidadesComponent},
  {path:'ventas',component:VentasComponent},
  {path:'marcas',component:MarcasComponent},
  {path:'ingredientes',component:IngredientesComponent}
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
