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


const routes:Routes=[
  //{path:'',redirectTo:'login', pathMatch:'full'},
  {path:'registro',component:RegistroComponent},
  {path:'',component:LoginComponent},
  {path:'receta',component:RecetasComponent},
  {path:'descripcion',component:DescripcionRecetaComponent},
  {path:'formularioReceta',component:FormularioRecetasComponent},
  {path:'home',component:HomeComponent},
  {path:'plantillas',component:PlantillasComponent}
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
