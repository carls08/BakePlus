import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ingredienteI } from 'src/app/models/ingrediente.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent {
  nuevoIngrediente: FormGroup;
  ingredientes: ingredienteI[] = []
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.nuevoIngrediente = this.fb.group({
      nombre_ingrediente: ['', Validators.required]
    })


  }
  ngOnInit(): void {
    this.getAllIngredientes()
  }

  getAllIngredientes(): void {
    this.api.getAllIngredientes().subscribe(data => {
      this.ingredientes = data;
      console.log(this.ingredientes);

    })
  }
  postIngrediente(form: any) {
    console.log(form)
  }

}
