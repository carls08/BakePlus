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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  activeTab: string = 'registro'; // Puedes establecer 'registro' como pestaña activa por defecto

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
  nuevoForm: FormGroup;
  usuarios: any = [];
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
  // variable para el tipo de accion
  status_form: number = 0;
  status_response: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private modalServiceNgb: NgbModal) {
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
      id_usuario: ['']
    });
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

  }
  ngOnInit(): void {
    this.getRoles()
    this.getTipoDoc()
    this.getUsuarios()


  }
  // accion del formulario
  tipoAccion(accion: number, data: any = []) {
    this.status_form = accion;
    if (accion == 1) {
      data['cPassword_usuario'] = data['password_usuario'];
      this.nuevoForm.patchValue(data);
      console.log(data)
    } else {
      this.nuevoForm.patchValue({
        'apellido_usuario': '',
        'cPassword_usuario': '',
        'doc_usuario': '',
        'email_usuario': '',
        'id_rol': '',
        'id_tipo_documento': '',
        'id_usuario': '',
        'nombre_usuario': '',
        'password_usuario': '',
        'telefono_usuario': ''
      });
    }
  }

  getUsuarios() {
    this.api.getAllUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

  insertUsuarios(form: RegistroI) {
    switch (this.status_form) {
      case 0:
        this.api.insertUsuarios(form).subscribe(() => {
          console.log('Usuario registrado correctamente');
          Swal.fire({
            icon: "success",
            title: "Usuario registrado correctamente",
            showConfirmButton: false,
            timer: 1000

          });
          this.status_response = true;
        }, (error) => {
          console.error('Error al registrar usuario:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario o contraseña incorrecto",
            footer: '<a href="">Intenta nuevamente</a>'
          });
          this.status_response = false;
        });

        break;
      case 1:
        this.api.updateUsuarios(form).subscribe(() => {
          console.log('Usuario actualizado correctamente');
          Swal.fire({
            icon: "success",
            title: "Usuario actualizado correctamente",
            showConfirmButton: false,
            timer: 1000
          });
          this.status_response = true;
        }, (error) => {
          console.error('Error al actualizar usuario:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al actualizar usuario",
            footer: '<a href="">Intenta nuevamente</a>'
          });
          this.status_response = false;
        });
        break;
      default:
        console.log("Opción no reconocida");
    }

    setTimeout(() => {
      this.getUsuarios();
    }, 2000);
  }
  desactivarUsuario(usuario: RegistroI) {
    // Crear un nuevo objeto Uusuario con el cambio en estado_rg
    const usuarioActualizada: RegistroI = {
      ...usuario, // Copia todos los atributos de la usuario original
      estado_rg: 0 // Cambia el estado_rg al valor deseado
    };

    // Llamar a la API con la usuario actualizada
    this.api.deleteUsuario(usuarioActualizada).subscribe(() => {
      console.log('Usuario eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getUsuarios(); // Actualizar la lista de Usuarios después de eliminar
    }, (error) => {
      console.error('Error al eliminar el usuario:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
  }
  activarUsuario(usuario: RegistroI) {
    // Crear un nuevo objeto usuario con el cambio en estado_rg
    const usuarioActualizada: RegistroI = {
      ...usuario, // Copia todos los atributos de la usuario original
      estado_rg: 1 // Cambia el estado_rg al valor deseado
    };

    // Llamar a la API con la usuario actualizada
    this.api.deleteUsuario(usuarioActualizada).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getUsuarios(); // Actualizar la lista de usuarios después de eliminar
    }, (error) => {
      console.error('Error al eliminar el usuario:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
  }

  salir() {
    this.router.navigate(['home'])
  }
  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
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
    if (apellidoControl?.errors) {
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
    if (passControl?.errors) {
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

    if (cPassControl?.errors) {
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
    if (telControl?.errors && telControl?.value.toString().length == 0) {
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
        console.log('Roles antes de terminar:', data);
        this.roles = data;
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
    return this.usuarios.slice(startIndex, endIndex);
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
    return Math.ceil(this.usuarios.length / this.pageSize);
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

  // PDF GENERATOR
  generarPDF() {
    let num = 0;
    const contenido = [
      {
        columns: [
          {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS4AAAECCAYAAABALjoOAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAATtaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMiA3OS4xNjQ0NjAsIDIwMjAvMDUvMTItMTY6MDQ6MTcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDItMjBUMTQ6MDA6MzYtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTAyLTIwVDE0OjAxOjMxLTA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAyLTIwVDE0OjAxOjMxLTA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowODQwNjQzZS0xZmQyLTdlNDUtYWRiZC00NDliYzRhMzU1NmMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDg0MDY0M2UtMWZkMi03ZTQ1LWFkYmQtNDQ5YmM0YTM1NTZjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDg0MDY0M2UtMWZkMi03ZTQ1LWFkYmQtNDQ5YmM0YTM1NTZjIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowODQwNjQzZS0xZmQyLTdlNDUtYWRiZC00NDliYzRhMzU1NmMiIHN0RXZ0OndoZW49IjIwMjQtMDItMjBUMTQ6MDA6MzYtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5VmV74AADc6ElEQVR4nOx9d6BlV1nv7/vW2nufcvvMnT6TTCa9Awkt1CggiDykCmKBp8hTERCeiA0RFVTEhooNy1NUFFCRTiBgICEJCakzk8n0mTu311N2WWt974+1zrnn3pkkdzItk5wfnNy595yzV9l7//bXPxIRdNFFF12cTeAzPYEuuuiii+NFl7i66KKLsw5d4uqiiy7O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",
            width: 100
          }, {
            text: 'Informe de Usuarios', style: 'header'
          }
        ]
      },
      { text: '\n\n' },
      {
        table: {
          headerRows: 1,
          widths: [10, '*', '*', '*', '*', '*', 70],
          body: [
            [
              { text: '#', style: 'filaEncabezado' },
              { text: 'Documento', style: 'filaEncabezado' },
              { text: 'Nombres', style: 'filaEncabezado' },
              { text: 'Apellidos', style: 'filaEncabezado' },
              { text: 'Correo', style: 'filaEncabezado' },
              { text: 'Telefono', style: 'filaEncabezado' },
              { text: 'Estado', style: 'filaEncabezado' },
            ],
            ...this.usuarios.map(data => [
              { text: num = num + 1, style: 'filaDatos' },
              { text: data.doc_usuario, style: 'filaDatos' },
              { text: data.nombre_usuario, style: 'filaDatos' },
              { text: data.apellido_usuario, style: 'filaDatos' },
              { text: data.email_usuario, style: 'filaDatos' },
              { text: data.telefono_usuario, style: 'filaDatos' },
              { text: data.estado_rg == 1 ? 'Activa' : 'Inactiva', style: 'filaDatos' }
            ])
          ]
        }
      }
    ];

    const estilos = {
      header: {
        fontSize: 20,
        bold: true,
        color: 'blue',
        marginTop: 50,
        marginLeft: 30
      },
      subtitulo: {
        fontSize: 14,
        bold: true,
        marginBottom: 5
      },
      texto: {
        fontSize: 12,
        marginBottom: 5
      },
      tabla: {
        marginTop: 10,
        fontSize: 12
      },
      filaEncabezado: {
        bold: true,
        fillColor: '#CCCCCC',
        fontSize: 10,
        alignment: 'center'
      },
      filaDatos: {
        italics: true,
        color: 'gray',
        alignment: 'center',
        fontSize: 7
      }
    };

    const documentDefinition = {
      content: contenido,
      styles: estilos
    };

    pdfMake.createPdf(documentDefinition).open();
  }

}

