import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { marcasI } from 'src/app/models/marcas.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent {

  nuevoMarca: FormGroup;
  marcas: any = []
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.nuevoMarca = this.fb.group({
      nombre_marca: ['', Validators.required]
    })

  }
  ngOnInit(): void {
    this.api.getAllMarcas().subscribe(data => {
      console.log(data);
      this.marcas=data;
    })
  }

  postMarca(form: any) {
    console.log(form)
  }
  salir(){
    this.router.navigate(['home'])
  }

}
