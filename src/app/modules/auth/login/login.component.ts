import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

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
      this.router.navigateByUrl('/');
    }
  }

  login(){
    if(!this.email || !this.password){
      alert('Todos los datos son requeridos')
      return;
    }
    this.authService.login(this.email, this.password).subscribe(
      (res:any)=>{
        console.log(res);
        if(res){
          // window.location.reload();
          this.router.navigateByUrl('/');
        }else{
          alert('Las Credenciales no existen')
        }
      }
    )
  }

  register(){
    if(!this.email_register || !this.name || !this.surname || !this.password_register || !this.password_confirm){
      alert('Todos los Campos son necesarios');
      return;
    }

    if(this.password_register != this.password_confirm){
      alert('Las Contraseñas son diferentes');
      return;
    }

    let data = {
      email:this.email_register,
      name: this.name,
      surname:this.surname,
      password:this.password_register,
    }
    this.authService.register(data).subscribe(
      (res:any)=>{
        console.log(res);
        alert ('El Usuario se ha registrado correctamente')
      }, error => {
        alert ('Las Credenciales ingresadas no son correctas o ya existe')
      }
    )
  }

  

}
