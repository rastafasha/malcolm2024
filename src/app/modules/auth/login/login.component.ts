import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare function _clickDoc():any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //auth-login
  email: any = null;
  password:any = null;

  //auth-register
  name: any = null;
  surname: any = null;
  email_register: any = null;
  role_id: any = null;
  password_register: any = null;
  password_confirm: any = null;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
     _clickDoc();
    },50);
    if(this.authService.user){
      // this.router.navigateByUrl('/');
      window.location.href = "/";
      // window.location.href = "https://tudigitalmanger.com/iteach/";
    }
  }

  login(){
    if(!this.email || !this.password){
      Swal.fire ('Todos los datos son requeridos', 'intente de nuevo', 'warning')
      return;
    }
    this.authService.login(this.email, this.password).subscribe(
      (res:any)=>{
        console.log(res);
        if(res){
          // window.location.reload();
          // this.router.navigateByUrl('/store');
          window.location.href = "/store";
        }else{
          Swal.fire ('Las Credenciales no existen', 'intente de nuevo', 'error')
        }
      }
    )
  }

  register(){
    if(!this.email_register || !this.name || !this.surname || !this.password_register || !this.password_confirm){
     
      Swal.fire ('Todos los Campos son necesarios', 'intente de nuevo', 'error')
      return;
    }

    if(this.password_register != this.password_confirm){
      Swal.fire ('Las Contraseñas son diferentes', 'intente de nuevo', 'error')
      return;
    }

    let data = {
      email:this.email_register,
      name: this.name,
      surname:this.surname,
      password:this.password_register,
      role_id:2,
    }
    this.authService.register(data).subscribe(
      (res:any)=>{
        console.log(res);
        Swal.fire('El Usuario se ha registrado correctamente', 'Binvenido!', 'success');
        this.email = null;
          this.name = null;
          this.surname = null;
          this.password = null;
      }, error => {
        Swal.fire ('Las Credenciales ingresadas no son correctas o ya existe', 'intente de nuevo', 'error')
      }
    )
  }

  

}
