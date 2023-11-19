import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { NgIconsModule } from '@ng-icons/core';

import { heroUsers } from '@ng-icons/heroicons/outline';
import { RegistroComponent } from './layout/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RecetasComponent } from './layout/recetas/recetas.component';
import { DescripcionRecetaComponent } from './layout/descripcion-receta/descripcion-receta.component';
import { FormularioRecetasComponent } from './layout/formulario-recetas/formulario-recetas.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    RecetasComponent,
    DescripcionRecetaComponent,
    FormularioRecetasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgIconsModule.withIcons({ heroUsers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
