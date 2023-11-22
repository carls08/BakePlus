import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroI } from 'src/app/models/registro.interface';
import { ApiService } from 'src/app/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoForm: FormGroup;
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){
    this.nuevoForm=this.fb.group({
      id_rol:['',Validators.required],
    id_tipo_documento:['',Validators.required],
    doc_usuario:['',Validators.required],
    password_usuario:['',Validators.required],
    nombre_usuario:['',Validators.required],
    apellido_usuario:['',Validators.required],
    telefono_usuario:['',Validators.required],
    email_usuario:['',Validators.required],
    })

  }
  ngOnInit():void {

  }
  postForm(form:RegistroI){
    console.log(form);
    this.api.postUsuarios(form).subscribe(data =>{
      console.log(data)
      if(data){
        
        Swal.fire({
          icon: "success",
          title: "Registro Exitoso",
          showConfirmButton: false,
          timer: 1500
        });

      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Regitro incorrecto",
          footer: '<a href="">Intenta nuevamente</a>'
        });
      }
    })

  }
  salir(){
    this.router.navigate(['home'])
  }
  
}

