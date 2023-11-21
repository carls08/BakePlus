import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UnidadesI } from 'src/app/models/unidades.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent {
  nuevoUnidad: FormGroup;
  unidad_medida: UnidadesI[] = []
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.nuevoUnidad = this.fb.group({
      abreviatura_unidad_medida: ['', Validators.required],
      nombre_unidad_medida: ['', Validators.required]

    })

  }
  ngOnInit(): void {
    this.getAllUnidades()
  }

  postUnidad(form: any) {
    console.log(form)

  }
  getAllUnidades(): void {
    this.api.getAllUnidades().subscribe(data => {
      this.unidad_medida = data;
      console.log(this.unidad_medida);

    })

  }
}
