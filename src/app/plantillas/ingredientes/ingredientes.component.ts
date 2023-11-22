import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ingredienteI } from 'src/app/models/ingrediente.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent {
  nuevoIngrediente: FormGroup;
  ingredientes:any = []
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.nuevoIngrediente = this.fb.group({
      nombre_ingrediente: ['', Validators.required]
    })


  }
  ngOnInit(): void {
    this.api.getAllIngredientes().subscribe(data => {
      console.log(data);
      this.ingredientes=data;
    })
  }
  postIngrediente(form: any) {
    console.log(form)
  }
  salir(){
    this.router.navigate(['home'])
  }
}
