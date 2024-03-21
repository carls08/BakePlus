import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroI } from 'src/app/models/registro.interface';
import { RolesI } from 'src/app/models/roles.interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoForm: FormGroup;
  roles: RolesI[] = []; // Utiliza la interfaz para tipar el array de roles
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.nuevoForm = this.fb.group({
      id_tipo_documento: ['', Validators.required],
      nombre_usuario: ['', Validators.required],
      telefono_usuario: ['', Validators.required],
      password_usuario: ['', Validators.required],
      email_usuario: ['', [Validators.required, Validators.email]],
      doc_usuario: ['', Validators.required],
      apellido_usuario: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.getRoles();

  }
  postForm(form: RegistroI) {
    console.log(form);
    this.api.postUsuarios(form).subscribe(data => {
      console.log(data)
      if (data) {

        Swal.fire({
          icon: "success",
          title: "Registro Exitoso",
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Regitro incorrecto",
          footer: '<a href="">Intenta nuevamente</a>'
        });
      }
    })

  }
  salir() {
    this.router.navigate(['home'])
  }
  validateEmail() {
    const emailControl = this.nuevoForm.get('email_usuario');
    if (emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)) {
      // Marcamos el control como tocado para que el mensaje de error se muestre incluso si no se ha modificado el valor
      emailControl.markAsTouched();
    }
  }

  getRoles() {
    this.api.getAllRoles().subscribe({
      next: (data: RolesI[]) => {
        console.log(data)
        this.roles = data;
        if (Array.isArray(data)) {
          this.roles = data;
          console.log(data)
        } else {
          this.roles = [data];
          console.log(data)
        }
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }

}

