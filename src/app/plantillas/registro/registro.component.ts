import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroI } from 'src/app/models/registro.interface';
import { RolesI } from 'src/app/models/roles.interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs';
import { TipoDocI } from 'src/app/models/tipoDocument.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoForm: FormGroup;
  roles: RolesI[] = [];
  tipoDocs: TipoDocI[] = [];
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.nuevoForm = this.fb.group({
      id_tipo_documento: ['', Validators.required],
      nombre_usuario: ['', Validators.required, Validators.minLength(4)],
      telefono_usuario: ['', Validators.required, Validators.minLength(10)],
      password_usuario: ['', Validators.required, Validators.minLength(6)],
      email_usuario: ['', [Validators.required, Validators.email]],
      doc_usuario: ['', Validators.required, Validators.minLength(6)],
      apellido_usuario: ['', Validators.required, Validators.minLength(6)],
    });

  }
  ngOnInit(): void {
    this.getRoles()
    this.getTipoDoc()


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
  // Método para validar el email
  validateEmail() {
    const emailControl = this.nuevoForm.get('email_usuario');
    if (emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)) {
      return true; // El email es inválido
    }
    return false; // El email es válido
  }
  validateNombre() {
    const nombreControl = this.nuevoForm.get('nombre_usuario');
    if (nombreControl?.invalid && (nombreControl?.dirty || nombreControl?.touched)) {
      return true; // El email es inválido
    }
    return false; // El email es válido
  }
  validateApellido() {
    const apellidoControl = this.nuevoForm.get('apellido_usuario');
    if (apellidoControl?.invalid && (apellidoControl?.dirty || apellidoControl?.touched)) {
      return true; // El email es inválido
    }
    return false; // El email es válido
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

  getTipoDoc() {
    this.api.getAllTipoDoc().subscribe({
      next: (data: TipoDocI[]) => {
        console.log(data)
        this.roles = data;
        if (Array.isArray(data)) {
          this.roles = data;
          console.log(this.roles)
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

