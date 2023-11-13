import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent {
  constructor(
    private router:Router
  ){}
descripcion(){
  this.router.navigate(['descripcion'])
}
}
