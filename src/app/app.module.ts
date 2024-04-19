import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './plantillas/footer/footer.component';
import { HomeComponent } from './plantillas/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { RegistroComponent } from './plantillas/registro/registro.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { LoginComponent } from './vistas/login/login.component';
import { RecetasComponent } from './plantillas/recetas/recetas.component';
import { DescripcionRecetaComponent } from './plantillas/descripcion-receta/descripcion-receta.component';
import { FormularioRecetasComponent } from './plantillas/formulario-recetas/formulario-recetas.component';
import { VistasComponent } from './vistas/vistas.component';
import {HttpClientModule} from '@angular/common/http';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { UnidadesComponent } from './plantillas/unidades/unidades.component';
import { MarcasComponent } from './plantillas/marcas/marcas.component';
import { IngredientesComponent } from './plantillas/ingredientes/ingredientes.component';
import { VentasComponent } from './plantillas/ventas/ventas.component';
import { EditarItemModalComponent } from './plantillas/editar-item-modal/editar-item-modal.component';
import { EstadisticasComponent } from './plantillas/estadisticas/estadisticas.component';
import { TableroComponent } from './plantillas/tablero/tablero.component';
import { ProductosComponent } from './plantillas/productos/productos.component';
import { ProduccionComponent } from './plantillas/produccion/produccion.component'


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
    FormularioRecetasComponent,
    VistasComponent,
    PlantillasComponent,
    UnidadesComponent,
    MarcasComponent,
    IngredientesComponent,
    VentasComponent,
    EditarItemModalComponent,
    EstadisticasComponent,
    TableroComponent,
    ProductosComponent,
    ProduccionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({ heroUsers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
