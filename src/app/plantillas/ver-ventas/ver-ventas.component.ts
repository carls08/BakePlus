import { Component } from '@angular/core';
import { detalleVenta } from 'src/app/models/detalleVenta.inteface';
import { ventaResponse } from 'src/app/models/venta.interface';
import { ApiService } from 'src/app/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.component.html',
  styleUrls: ['./ver-ventas.component.css']
})
export class VerVentasComponent {
  currentPage: number = 1;
  pageSize: number = 10; 
  ventas: any = []
  constructor(private api: ApiService,){

  }
  ngOnInit(): void {

    this.getVentas()

  }

  getVentas(){
    this.api.getAllVentas().subscribe(data => {
      this.ventas = data;
    })
  }


  getCurrentRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  getCurrentPageItems(): ventaResponse[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.ventas.slice(startIndex, endIndex);
  }

  desactivarVentas(ventas: ventaResponse) {
    // Crear un nuevo objeto ventas con el cambio en estado_rg
    const ventasActualizada: ventaResponse = {
      ...ventas, // Copia todos los atributos de la ventas original
      estado_rg: 0 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la ventas actualizada
    this.api.deleteVentas(ventasActualizada).subscribe(() => {
      console.log('ventas eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getVentas(); // Actualizar la lista de ventass después de eliminar
    }, (error) => {
      console.error('Error al eliminar la ventas:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
  }
  activarVentas(ventas: ventaResponse) {
    // Crear un nuevo objeto ventas con el cambio en estado_rg
    const ventasActualizada: ventaResponse = {
      ...ventas, // Copia todos los atributos de la ventas original
      estado_rg: 1 // Cambia el estado_rg al valor deseado
    };
  
    // Llamar a la API con la ventas actualizada
    this.api.deleteVentas(ventasActualizada).subscribe(() => {
      console.log('ventas eliminada correctamente');
      Swal.fire({
        icon: "success",
        title: "Realizado!",
        showConfirmButton: false,
        timer: 1000
      });
      this.getVentas(); // Actualizar la lista de ventass después de eliminar
    }, (error) => {
      console.error('Error al eliminar la ventas:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });
    });
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
    return Math.ceil(this.ventas.length / this.pageSize);
  }
  
}
