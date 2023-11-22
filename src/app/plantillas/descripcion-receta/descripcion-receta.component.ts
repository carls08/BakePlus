import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-descripcion-receta',
  templateUrl: './descripcion-receta.component.html',
  styleUrls: ['./descripcion-receta.component.css']
})
export class DescripcionRecetaComponent {
  recetaidpan:any=[]
  constructor( private activerouter:ActivatedRoute,private api:ApiService){

  }
  ngOnInit():void{
    let recetasid=this.activerouter.snapshot.paramMap.get('id');
 this.api.getSingleReceta(recetasid).subscribe(data =>{
  this.recetaidpan=data
  console.log(data)
 })
  }

}
