import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { RegistroComponent } from './layout/registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RecetasComponent } from './layout/recetas/recetas.component';
import { DescripcionRecetaComponent } from './layout/descripcion-receta/descripcion-receta.component';
import { FormularioRecetasComponent } from './layout/formulario-recetas/formulario-recetas.component';


const routes:Routes=[
  {path:'',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'login',component:LoginComponent},
  {path:'receta',component:RecetasComponent},
  {path:'descripcion',component:DescripcionRecetaComponent},
  {path:'formularioReceta',component:FormularioRecetasComponent},
  {path:'home',component:HomeComponent}
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
