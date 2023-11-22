import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UnidadesI } from 'src/app/models/unidades.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent {
  nuevoUnidad: FormGroup;
  unidad_medida:any = []
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.nuevoUnidad = this.fb.group({
      abreviatura_unidad_medida: ['', Validators.required],
      nombre_unidad_medida: ['', Validators.required]

    })

  }
  ngOnInit(): void {
    this.api.getAllUnidades().subscribe(data => {
      console.log(data);
      this.unidad_medida=data;
    })
  }

  postUnidad(form: any) {
    console.log(form)

  }
  salir(){
    this.router.navigate(['home'])
  }
  
}
