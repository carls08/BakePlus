import { Component } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { detalleVenta } from 'src/app/models/detalleVenta.inteface';
import { productosI } from 'src/app/models/productos.interface';
import { ventaCreate } from 'src/app/models/venta.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {


  productos: productosI[]
  precioProducto: number = 0
  productoSelect: string = null
  detalleVenta: detalleVenta

  venta: ventaCreate = {
    id_usuario: 0,
    nombre_cliente: '',
    total_venta: 0,
    fecha_venta: new Date,
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getProductos();
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
          cantidad_producto: producto.cantidad_producto,
          precio_unitario: producto.precio_producto,
          precio_total: producto.precio_producto * producto.cantidad_producto
        };
      }
    }
  }
  addProduct() {
    if (this.venta !== null) {
      this.venta.detalleVenta.push(this.detalleVenta);
      this.venta.total_venta = this.calcularTotal();
    } else {
      console.log("venta es nula")
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
    //this.invoice.products.splice(index, 1);
  }

  onSubmit() {
    //console.log('Invoice:', this.invoice);
    // Aquí puedes manejar la lógica de envío del formulario
  }

  buscarCliente() {
    // Lógica para filtrar clientes basado en el término de búsqueda
    // Puedes implementar la lógica de filtrado aquí
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
}
