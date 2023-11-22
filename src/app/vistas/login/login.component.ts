import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(

    private router:Router, private api:ApiService, private fb:FormBuilder
  ){
    this.loginForm=this.fb.group({
      usuario:['',Validators.required],
      contraseña:['',Validators.required]
    })
  }
 ngOnInit():void {
  this.checkLocalStorage();
 }
  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['home'])
    }
  }

  onLogin(form:LoginI){
   console.log(form)
   this.api.loginByEmail(form).subscribe(data =>{
    console.log(data)
    let dataResponse:ResponseI=data;
    if(dataResponse){
      console.log("token: "+dataResponse.token)
      localStorage.setItem("token",dataResponse.token);
      
      this.router.navigate(['home'])
      Swal.fire({
        icon: "success",
        title: "Has ingresado",
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrecto",
        footer: '<a href="">Intenta nuevamente</a>'
      });

    }
   })
   
    

  }
}
