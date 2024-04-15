import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import Swal from 'sweetalert2';
import { ingredientesI } from 'src/app/models/ingrediente.interface';
import { UnidadesComponent } from 'src/app/plantillas/unidades/unidades.component';
import { UnidadesI } from 'src/app/models/unidades.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  usuarioClicked: boolean = false;
  passClicked: boolean = false;
  ingredientes: ingredientesI[] = [];
  unidades: UnidadesI[] = [];

  constructor(

    private router: Router, private api: ApiService, private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    this.checkLocalStorage();
  }
  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['home'])
    }
  }

  onLogin(form: LoginI) {
    console.log(form)
    this.api.loginByEmail(form).subscribe(data => {
      console.log(data)
      let dataResponse: ResponseI = data;
      if (dataResponse) {
        localStorage.setItem("token", dataResponse.token);
        localStorage.setItem("nombre_usuario", dataResponse.nombre_usuario);

        this.router.navigate(['home'])
        this.getAllInngredientes()
        this.getAllUnidades()
        Swal.fire({
          icon: "success",
          title: "Has ingresado",
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña incorrecto",
          footer: '<a href="">Intenta nuevamente</a>'
        });

      }
    })
  }
  // Método para validar el email
  validateUsuario() {
    if (!this.usuarioClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const emailControl = this.loginForm.get('usuario');
    if (emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)) {
      return 'El correo no es valido!';
    } else if (emailControl?.value.length <= 9) {
      return 'Al menos 6 caracteres.'
    }
    return null; // El email es válido
  }
  // Método para validar pass
  validatePass() {
    if (!this.passClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const passControl = this.loginForm.get('contraseña');
    if (passControl?.invalid && (passControl?.dirty || passControl?.touched)) {
      return 'contraseña no es valido!';
    } else if (passControl?.value.length <= 5) {
      return 'Al menos 4 caracteres.'
    }
    return null; // El email es válido
  }
  onUsuarioClicked() {
    this.usuarioClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onPassClicked() {
    this.passClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  isFormValid(): boolean {
    return this.loginForm.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }

  getAllInngredientes(){
    this.api.getAllIngredientes().subscribe(data => {
      this.ingredientes=data;
      localStorage.setItem("ingredientes", JSON.stringify(this.ingredientes));
    })
  }
  getAllUnidades(){
    this.api.getAllUnidades().subscribe(data => {
      this.unidades=data;
      localStorage.setItem("unidades", JSON.stringify(this.unidades));
    })
  }
}
