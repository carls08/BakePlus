import { Component } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { detalleVenta } from 'src/app/models/detalleVenta.inteface';
import { productosI } from 'src/app/models/productos.interface';
import { ventaCreate } from 'src/app/models/venta.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {


  productos: productosI[]
  precioProducto: number = 0
  cantidadProducto: number = 0
  productoSelect: string = null
  detalleVenta: detalleVenta
  isSaved: boolean = false
  isProduct: boolean = false
  isClient: boolean = false
  
  venta: ventaCreate = {
    id_usuario: 0,
    nombre_cliente: '',
    total_venta: 0,
    fecha_venta: this.obtenerFechaFormateada(),
    detalleVenta: []
  };

  clienteSeleccionado: any | null = null;
  clientesSeleccionados: any[] = [];
  cliente
  fechaFormato
  idFact
  id: number;
  nombre: string;
  telefono: string;
  searchTerm: string = ''; // Definir la propiedad searchTerm

  constructor(private api: ApiService, private auth:AuthService) { }

  ngOnInit(): void {
    this.getProductos();
    this.venta.id_usuario = this.auth.getLoggedInIdUser();
    
  }

  getProductos() {
    this.api.getAllProductos().subscribe(data => {
      this.productos = data;
    })
  }
  onChangeProducto(event: any) {
    this.productoSelect = event.target.value;
    for (const producto of this.productos) {
      if (producto.nombre_producto === this.productoSelect) {
        this.precioProducto = producto.precio_producto
        //mapeamos una inteface a otra
        this.detalleVenta = {
          id_producto: producto.id_producto,
          cantidad_producto: 0,
          precio_unitario: producto.precio_producto,
          precio_total: 0
        };
      }
    }
    if (this.venta.nombre_cliente !== "") {
      this.isClient = true;
    }
  }
  addProduct() {
    if (this.venta !== null) {
      this.detalleVenta.cantidad_producto = this.cantidadProducto
      this.detalleVenta.precio_total = this.detalleVenta.precio_unitario * this.detalleVenta.cantidad_producto
      this.venta.detalleVenta.push(this.detalleVenta);
      this.venta.total_venta = this.calcularTotal();
      this.isProduct = true;
    }

  }

  obtenerFechaFormateada(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque en JavaScript los meses van de 0 a 11
    const año = fechaActual.getFullYear();
    return `${dia}-${mes}-${año}`;
  }

  removeProduct(index: number) {
    this.venta.detalleVenta.splice(index, 1);
    this.venta.total_venta = this.calcularTotal();
  }

  registrar() {

    this.insertVenta()

    this.isSaved = true;

  }


  seleccionarCliente(cliente: any) {
    this.clienteSeleccionado = cliente;
  }

  agregarClienteSeleccionado() {
    if (this.clienteSeleccionado) {
      this.clientesSeleccionados.push(this.clienteSeleccionado);
      this.clienteSeleccionado = null;
    }
  }

  eliminarClienteSeleccionado(cliente: any) {
    const index = this.clientesSeleccionados.indexOf(cliente);
    if (index !== -1) {
      this.clientesSeleccionados.splice(index, 1);
    }
  }

  getNombreProducto(id_producto: number): string {
    let nombre
    for (const producto of this.productos) {
      if (producto.id_producto === id_producto) {
        nombre = producto.nombre_producto;
      }
    }
    return nombre;
  }

  calcularTotal(): number {
    let total = 0;
    for (const producto of this.venta.detalleVenta){
      total += producto.precio_total;
    }
    return total;

  }
  imprimir() {
    // Imprime solo la sección de la factura
    const printContents = document.querySelector('.printable-area')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Recarga la página para restaurar el contenido original
    }
  }

  insertVenta(){
    console.log(this.venta)
    this.api.insertVenta(this.venta).subscribe(
      () => {
        console.log('venta insertada correctamente');
        Swal.fire({
          icon: 'success',
          title: 'venta ingreada',
          showConfirmButton: false,
          timer: 1000,
        });
      },
      (error) => {
        console.error('Error al ingresar la venta:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ocurrio un error!',
          footer: '<a href="">Intenta nuevamente</a>',
        });
      }
    );
  }

}
