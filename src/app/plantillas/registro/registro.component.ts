import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroI } from 'src/app/models/registro.interface';
import { RolesI } from 'src/app/models/roles.interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import Swal from 'sweetalert2';
import { TipoDocI } from 'src/app/models/tipoDocument.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarItemModalComponent } from '../editar-item-modal/editar-item-modal.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoForm: FormGroup;
  usuario: any=[];
  roles: RolesI[] = [];
  tipoDocs: TipoDocI[] = [];
  nombreClicked: boolean = false;
  apellidoClicked: boolean = false;
  documentoClicked: boolean = false;
  telefonoClicked: boolean = false;
  passwordClicked: boolean = false;
  cPasswordClicked: boolean = false;
  emailClicked: boolean = false;
  tipoDocClicked: boolean = false;
  rolClicked: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10; // Tamaño de la página
  
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,private modalServiceNgb: NgbModal) {
    this.nuevoForm = this.fb.group({
      id_tipo_documento: ['', Validators.required],
      id_rol: ['', Validators.required],
      nombre_usuario: ['', Validators.required],
      telefono_usuario: ['', Validators.required],
      password_usuario: ['', Validators.required],
      cPassword_usuario: ['', Validators.required],
      email_usuario: ['', [Validators.required, Validators.email]],
      doc_usuario: ['', Validators.required],
      apellido_usuario: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.getRoles()
    this.getTipoDoc()
    this.getUsuarios()


  }
  getUsuarios() {
    this.api.getAllUsuarios().subscribe(data => {
      console.log(data)
      this.usuario = data;
    })
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
      return 'El correo no es valido!';
    }
    return null; // El email es válido
  }
validateNombre() {
    if (!this.nombreClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const nombreControl = this.nuevoForm.get('nombre_usuario');
    if (nombreControl?.errors && nombreControl?.value.length == 0) {
      return 'El nombre es requerido.';
    } else if (nombreControl?.value.length < 4) {
      return 'Al menos 4 caracteres.';
    }
    return null; // No hay error
  }
  validateApellido() {
    if (!this.apellidoClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const apellidoControl = this.nuevoForm.get('apellido_usuario');
    if (apellidoControl?.errors  ) {
      return 'El apellido es requerido.';
    } else if (apellidoControl?.value.length < 4) {
      return 'Al menos 4 caracteres.';
    }
    return null; // No hay error
  }

  validatePassword() {
    if (!this.passwordClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const passControl = this.nuevoForm.get('password_usuario');
    if (passControl?.errors ) {
      return 'El contraseña es requerido.';
    } else if (passControl?.value.length <= 5) {
      return 'Al menos 6 caracteres.';
    }
    return null; // No hay error
  }
  validateCPassword() {
    if (!this.cPasswordClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const cPassControl = this.nuevoForm.get('cPassword_usuario');
    const passControl = this.nuevoForm.get('password_usuario');

    if (cPassControl?.errors ) {
      return 'El contraseña es requerido.';
    } else if (cPassControl?.value.length <= 5) {
      return 'Al menos 6 caracteres.';
    } else if (cPassControl?.value !== passControl?.value) {
      return 'la contraseña no coincide';
    }
    return null; // No hay error
  }

  validateDocument() {
    if (!this.documentoClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const docControl = this.nuevoForm.get('doc_usuario');
    if (docControl?.errors) {
      return 'El documento es requerido';
    } else if (docControl?.value.toString().length < 6) {
      return 'Al menos 6 numeros';
    }
    return null; // No hay error
  }
  validateTel() {
    if (!this.telefonoClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const telControl = this.nuevoForm.get('telefono_usuario');
    if (telControl?.errors&& telControl?.value.toString().length == 0) {
      return 'El telefono es requerido';
    } else if (telControl?.value.toString().length < 10) {
      return 'Al menos 10 numeros';
    }
    return null; // No hay error
  }
  validaTipoDoc() {
    if (!this.tipoDocClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const tipoDocControl = this.nuevoForm.get('id_tipo_documento');
    if (tipoDocControl?.value == '') {
      return 'Tipo de documento requerido.';
    }
    return null; // No hay error
  }
  validaRol() {
    if (!this.rolClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const rolControl = this.nuevoForm.get('id_rol');
    if (rolControl?.value == '') {
      return 'Rol es requerido.';
    }
    return null; // No hay error
  }


  getRoles() {
    this.api.getAllRoles().subscribe({
      next: (data: RolesI[]) => {
        this.roles = data;
        if (Array.isArray(data)) {
          this.roles = data;
        } else {
          this.roles = [data];
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
        this.tipoDocs = data;
        if (Array.isArray(data)) {
          this.tipoDocs = data;
        } else {
          this.tipoDocs = [data];
        }
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }
  onNombreClicked() {
    this.nombreClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  onApellidoClicked() {
    this.apellidoClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  onDocClicked() {
    this.documentoClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  onTelClicked() {
    this.telefonoClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onPassClicked() {
    this.passwordClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onCPassClicked() {
    this.cPasswordClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onEmailClicked() {
    this.emailClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onTipoDocClicked() {
    this.tipoDocClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onRolClicked() {
    this.rolClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  isFormValid(): boolean {
    return this.nuevoForm.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }

  getCurrentPageItems(): RegistroI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.usuario.slice(startIndex, endIndex);
  }
  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.usuario.length / this.pageSize);
  }
  abrirModalParaEditarItem(usuario: RegistroI) {
    const modalRef = this.modalServiceNgb.open(EditarItemModalComponent);
    modalRef.componentInstance.item = usuario;

    modalRef.result.then((result: RegistroI) => {
      if (result) {
        // Si se recibe un resultado (objeto modificado), puedes realizar las acciones necesarias aquí
        console.log('Objeto modificado:', result);
        // Por ejemplo, aquí puedes enviar los datos modificados a la API
        this.api.updateUsuarios(result).subscribe(() => {
          console.log('Receta actualizada correctamente');
        }, (error) => {
          console.error('Error al actualizar la receta:', error);
        });
      } else {
        // Si no se recibe un resultado (se cerró el modal sin cambios), puedes manejarlo aquí
        console.log('Se cerró el modal sin cambios');
      }
    }).catch((error) => {
      console.error('Error al cerrar el modal:', error);
    });

  }


}

