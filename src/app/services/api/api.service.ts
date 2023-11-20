import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string ="http://127.0.0.1:5000/";

  constructor(private http: HttpClient) {}

    loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "usuarios/login";
    return this.http.post<ResponseI>(direccion, form);
     

    } 
  }

