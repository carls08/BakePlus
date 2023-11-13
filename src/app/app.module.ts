import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NgIconsModule } from '@ng-icons/core';

import { heroUsers } from '@ng-icons/heroicons/outline';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RecetasComponent } from './recetas/recetas.component';
import { DescripcionRecetaComponent } from './descripcion-receta/descripcion-receta.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    RecetasComponent,
    DescripcionRecetaComponent
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
