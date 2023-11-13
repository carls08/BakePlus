import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(

    private router:Router
  ){
  }
  registro(){
    this.router.navigate(['registro'])
  }
  login(){
    this.router.navigate(['login'])
  }  
  receta(){
    this.router.navigate(['receta'])
  }
}
